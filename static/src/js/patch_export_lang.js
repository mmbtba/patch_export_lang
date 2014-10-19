/*# encoding: utf-8
##############################################################################
#
#     patch for base export language
#     Copyright (C) 2014  zkjiao@gmail.com
# 
#     This program is free software: you can redistribute it and/or modify
#     it under the terms of the GNU Affero General Public License as
#     published by the Free Software Foundation, either version 3 of the
#     License, or (at your option) any later version.
# 
#     This program is distributed in the hope that it will be useful,
#     but WITHOUT ANY WARRANTY; without even the implied warranty of
#     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#     GNU Affero General Public License for more details.
# 
#     You should have received a copy of the GNU Affero General Public License
#     along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################*/

openerp.patch_export_lang = function(instance) {
	var _t = instance.web._t,
	   _lt = instance.web._lt;
	var QWeb = instance.web.qweb;
	
	instance.web.form.widgets.add('many2many_tags_p', 'instance.patch_export_lang.FieldMany2ManyTags');
    instance.patch_export_lang.FieldMany2ManyTags =	instance.web.form.FieldMany2ManyTags.extend({
    	_search_create_popup : function(view, ids, context) {
	        var self = this;
	        var pop = new instance.web.form.SelectCreatePopup(this);
	        pop.select_element(
	            self.field.relation,
	            {
	                title: (view === 'search' ? _t("Search: ") : _t("Create: ")) + this.string,
	                initial_ids: ids ? _.map(ids, function(x) {return x[0];}) : undefined,
	                initial_view: view,
	                // beg: modify by jzk 
	                disable_multiple_selection: false
	                // end: modify by jzk 
	            },
	            self.build_domain(),
	            new instance.web.CompoundContext(self.build_context(), context || {})
	        );
	        pop.on("elements_selected", self, function(element_ids) {
	        	// beg: modify by jzk 
	        	for (var i = 0; i < element_ids.length; i++){
	        		self.add_id(element_ids[i]);
	        	}	            
	            // end: modify by jzk 
	            self.focus();
	        });
	    }
	});
	instance.web.form.CompletionFieldMixin._search_create_popup = 
		function(view, ids, context) {
	        var self = this;
	        // beg: add by jzk 
	        var ctx = self.build_context();
	        var res = instance.web.pyeval.eval("contexts", ctx);
	        var mul = false;
	        if (res.enable_multiple_selection){
	        	mul = true;
	        }
	        // end: add by jzk
	        var pop = new instance.web.form.SelectCreatePopup(this);
	        pop.select_element(
	            self.field.relation,
	            {
	                title: (view === 'search' ? _t("Search: ") : _t("Create: ")) + this.string,
	                initial_ids: ids ? _.map(ids, function(x) {return x[0];}) : undefined,
	                initial_view: view,
	                // beg: modify by jzk 
	                disable_multiple_selection: !mul
	                // end: modify by jzk 
	            },
	            self.build_domain(),
	            // beg: modify by jzk 
	            new instance.web.CompoundContext(ctx, context || {})
	            // end: modify by jzk 
	        );
	        pop.on("elements_selected", self, function(element_ids) {
	        	// beg: modify by jzk 
	            self.add_id(element_ids);
	            // end: modify by jzk 
	            self.focus();
	        });
	    };
	instance.web.form.SelectCreatePopup.include({
		select_element: function(model, options, domain, context) {
			var result = instance.web.pyeval.eval("contexts", context);
			if (result.enable_multiple_selection){
				options.disable_multiple_selection = false;
			};
			this._super(model, options, domain, context);
		}
	});
};