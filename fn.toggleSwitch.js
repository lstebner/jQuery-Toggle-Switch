/**
fn.toggleSwitch.js
2011 - toggleSwitch plugin created by Luke Stebner
**/

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
			
			//private method
			//update settings data
			updateSettings: function(opts){
				if (opts){
					settings = $.extend(settings, opts);
					$self.data(key + '-settings', settings);
				}
			},
			
			//private method
			//store data
			saveData: function(){
				$self.data(key + '-data', data);
			},
			
			//private method
			//inject toggle HTML on init
			injectHTML: function(){
				if (!$self.hasClass('toggle')){
					$self.addClass('toggle');
				}
				
				$self.html( $('<a href="#" class="label switch">|||</a><a href="#on" class="label on">on</a><a href="#off" class="label off">off</a>') );
				
				var n = settings.name || $self.attr('name') || 'toggle_input';
				$self.append('<input type="hidden" name="' + n + '" />');
			},
			
			//private method
			//bind events to the pieces pieces of toggleSwitch 
			bindEvents: function(){
				//when the click 'on', the toggle is currently flipped to 'on', so turn it 'off'
				$self.find('.on').click(function(e){ methods.turnOff(); e.preventDefault(); });
				//opposite of 'on'
				$self.find('.off').click(function(e){ methods.turnOn(); e.preventDefault(); });
				//clicking the switch does a toggle to the current value
				$self.find('.switch').click(function(e){ methods.toggle(); e.preventDefault(); });
			},
			
			//method to disable switch
			disable: function(){
				//unbind all click events
				$self.find( '.on' ).unbind( 'click' );
				$self.find( '.off' ).unbind( 'click' );
				$self.find( '.switch' ).unbind( 'click' );
				
				//mark as disabled
				$self.addClass('disabled');
			},
			
			//method to enable the switch
			enable: function(){
				//a bare minimum way of avoiding double-binding of events, so be careful where you call this!
				if ( $self.hasClass('disabled') ){
					//rebind all events
					methods.bindEvents();
				
					//remove disabled
					$self.removeClass('disabled');
				}
			},
			
			//method that can be called to flip the value of the switch
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
			
			//method that can be called to force the switch to on
			turnOn: function(){
				data.value = 'on';
				
				//move the switch to visually cover 'off' 
				methods.moveSwitch( $self.find('.off').position().left );
				
				methods.saveData();
			},
			
			//method that can be called to force the switch to off
			turnOff: function(){
				data.value = 'off';
				
				//move the switch to visually cover 'on'
				methods.moveSwitch( $self.find('.on').position().left );
				
				methods.saveData();
			},
			
			//private method
			//animate the switch
			moveSwitch: function(new_x){
				//check if animation is enabled
				if (settings.animate){
					$self.find('.switch').animate({ left:new_x }, settings.animateSpeed);
				}
				//otherwise just move to the new position without animation
				else{
					$self.find('.switch').css({ left:new_x });
				}
				
				//check for input and change value if present
				if ( $self.children('input').length ){
					$self.children('input').val( methods.getValue() );
				}
				
				//update the switch's class to reflect the new value
				$self.find('.switch').removeClass('value-on value-off').addClass( 'value-' + data.value );
				
				//check for custom on change and call passing new value
				if (settings.onChange){
					settings.onChange( methods.getValue() );
				}
			},
			
			//method that can be called to retrieve current value 
			getValue: function(){
				return settings.values[ data.value ];
			}
		};
		
		//check for method call
		if ( typeof( opts ) == 'string' ){
			//check if method exists and call if so
			if ( methods.hasOwnProperty( opts ) ){
				var r = methods[ opts ]( args );
				
				//no method return value, return self
				if (r == null){ return $self; }
				//return method val
				else{ return r; }
			}
			else{
				//todo: throw useful error
				return false;
			}
		}
		//first init
		else{
			methods.init();
			return $self;
		}
	};
})( jQuery );