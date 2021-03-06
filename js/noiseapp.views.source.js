(function(jQuery, app, Model, undefined){
	app.views.source = function (node, model) {
		var elem = jQuery(node),
		    distElem = elem.find('.lp_dist'),
		    output = elem.find('.source_output'),
			levelreadout = elem.find('.level_readout'),
			ontimereadout = elem.find('.ontime_readout'),
			distreadout = elem.find('.dist_readout');
		
		model.on('output', function(model) {
			var value = model.get('output'),
			    str = Math.round(value) + ' dB';
			
			str = str.replace('Infinity', '&#8734;');
			
			output.html(str);
		});
		
		model.on('level', function(model) {
			var value = model.get('level');
			levelreadout.html(Math.round(value) + ' dB');
		});
		
		model.on('time', function(model) {
			var value = model.get('time');
			ontimereadout.html(Math.round(value) + '%');
		});
		
		model.on('distance', function(model) {
			var value = model.get('distance');
			distreadout.html(Math.round(value) + ' m');
		});
		
		elem
		.data('model', model)
		.on('change', '[data-prop="leveltype"]', function(e) {
			// Lp is 0, Lw is 1. We want to listen for when Lp is checked
			if (e.currentTarget.value === "0" && e.currentTarget.checked) {
				distElem.removeClass('hidden');
			}
			else {
				distElem.addClass('hidden');
			}
		});
		
		// Update anything with a readout
		model.trigger('output');
		model.trigger('level');
		model.trigger('time');
		model.trigger('distance');
		
		return elem;
	};
})(jQuery, noiseApp, Model);