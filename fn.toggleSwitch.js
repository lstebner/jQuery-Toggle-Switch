(function($){
	$.fn.toggleSwitch = function(opts, args){
		if ( this.length == 0 ){
			return false;
		}
		else if ( this.length > 1 ){
			return this.each(function(){
				$(this).toggleSwitch(opts, args);
			});
		}
		
		if (!opts){ opts = {}; }
		var $self = this;
		var key = 'toggle';
		
		var settings = this.data(key + '-settings');
		var data = this.data(key + '-data');
		
		//first time init
		if (!settings){
			data = {
				defaults: {
						animate: true,
						animateSpeed: 300,
						onChange: null,
						value: 'off',
						values: {
							off: false,
							on: true
						},
						name: null
				},
				value: 'off'
			};
		}
		
		var methods = {
			//initialize
			init: function(){
				settings = data.defaults;
				methods.updateSettings(opts);
				
				methods.injectHTML();
				methods.bindEvents();
				
				if (settings.value == 'on'){
					methods.turnOn();
				}
				else{
					methods.turnOff();
				}
				
				methods.saveData();
				
				return methods;
			},
			//update settings data
			updateSettings: function(opts){
				if (opts){
					settings = $.extend(settings, opts);
					$self.data(key + '-settings', settings);
				}
			},
			saveData: function(){
				$self.data(key + '-data', data);
			},
			injectHTML: function(){
				if (!$self.hasClass('toggle')){
					$self.addClass('toggle');
				}
				
				$self.html( $('<a href="#" class="label switch">|||<a href="#on" class="label on">on</a></a><a href="#off" class="label off">off</a>') );
				
				var n = settings.name || $self.attr('name') || 'toggle_input';
				$self.append('<input type="hidden" name="' + n + '" />');
			},
			bindEvents: function(){
				//when the click 'on', the toggle is currently flipped to 'on', so turn it 'off'
				$self.find('.on').click(function(e){ methods.turnOff(); e.preventDefault(); });
				//opposite of 'on'
				$self.find('.off').click(function(e){ methods.turnOn(); e.preventDefault(); });
				//clicking the switch does a toggle to the current value
				$self.find('.switch').click(function(e){ methods.toggle(); e.preventDefault(); });
			},
			toggle: function(){
				//when toggle is called, the value needs to be flipped. For that reason, if it's currently 'on'
				//switch it to 'off' and vice versa
				if (data.value == 'on'){
					methods.turnOff();
				}
				else{
					methods.turnOn();
				}
			},
			turnOn: function(){
				data.value = 'on';
				
				//move the switch to visually cover 'off' 
				methods.moveSwitch( $self.find('.off').position().left );
				
				methods.saveData();
			},
			turnOff: function(){
				data.value = 'off';
				
				//move the switch to visually cover 'on'
				methods.moveSwitch( $self.find('.on').position().left );
				
				methods.saveData();
			},
			moveSwitch: function(new_x){
				if (settings.animate){
					$self.find('.switch').animate({ left:new_x }, settings.animateSpeed);
				}
				else{
					$self.find('.switch').css({ left:new_x });
				}
				
				if ( $self.children('input').length ){
					$self.children('input').val( methods.getValue() );
				}
				
				$self.find('.switch').removeClass('value-on value-off').addClass( 'value-' + data.value );
				
				if (settings.onChange){
					settings.onChange( methods.getValue() );
				}
			},
			getValue: function(){
				return settings.values[ data.value ];
			}
		};
		
		if (typeof(opts) == 'string'){
			if (opts in methods){
				var r = methods[opts](args);
				if (r == null){ return $self; }
				else{ return r; }
			}
		}
		else{
			methods.init();
			return $self;
		}
	};
})( jQuery );