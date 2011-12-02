# jQuery Toggle Switch Plugin

## Description
This plugin allows you to create toggle switch style functionality like the on/off switches on the iPhone. 
Though, these come with a skin that isn't exactly like that, they can easily be re-skinned to your own style.

## Basic Example
````html
<div id="toggle" name="on_or_off"></div>
````

````javascript
$('#toggle').toggleSwitch();
````

The only odd thing you may notice is that I give the <div> a "title" value. The reason for this is that if 
you have your toggleSwitch inside of a form, you'll probably want the form to submit with a value for it.
Whatever name you give here, the toggleSwitch plugin will create a hidden input with that name and control
the value of it based on the toggleSwitch. This name could optionally be passed as an option (or not at all).

## Events Example
I've found I have 2 main uses for toggleSwitches. First is like the above example where they are simply an
input value in a form, the second would be when I want them to control something. Let's take an abstract
example to make this more obvious (and fun) than visualizing a webpage.

````html
<img src="/images/lightbulb_off.png" id="lightbulb-img" />
<div id="lightswitch"></div>
````

````javascript
$('#lightswitch').toggleSwitch({
	value: 'off',
	onChange: function( on ){
		if ( on ){
			$('#lightbulb-img').attr('src', '/images/lightbulb_on.png');
		}
		else{
			$('#lightbulb-img').attr('src', '/images/lightbulb_off.png');
		}
	}
});
````

There we have effectively used a toggleSwitch as a lightswitch to turn a lightbulb "on" and "off"!

## Markup
ToggleSwitch can be created on an empty div, but injects a nice little bit of it's own HTML. Luckily,
it keeps it minimal so style customization is up to you. The markup of a toggleSwitch looks like this:

````html
<a href="#" class="label switch">|||</a>
<a href="#on" class="label on">on</a>
<a href="#off" class="label off">off</a>
````

## Options

````
animate: 		true,
	- boolean, if you want the toggle switch to animate changing value

animateSpeed: 	300,
	- int (milliseconds), the duration of the animation
	
onChange: 		null,
	- function, callback when toggle is flipped, new value is passed
	
value: 			'off',
	- string 'on' or 'off', the default value
	
values: 		{
					off: false,
					on: true
				},
	- object, keys must be 'off' and 'on', the value of each is the value applied to the hidden input
	  created for use inside of forms
	
name: 			null,
	- string, the name to use for the hidden input that will be created (see Use In Forms section)
````

## Use In Forms
I mentioned this in the events example, but I want to make sure I explain it because this will probably
be the most common use of this plugin; inside of a form. 

When instantiated, this plugin will create a hidden element. It will either name it based off the 'name'
option, or you can give your html element a 'name' attribute. 

Whenever the switch is toggled, it will change the value of this input that way whenever the form is
submitted, the proper value will be submitted also. The value that gets put in this form is a boolean
by default, but can be customized with the 'values' option.

Of course, if you want to just get the value yourself, there is a method to do that.

## Methods

Methods can be called after the plugin's initial creation like so:

````javascript
//first create the toggle switch
$('#toggle').toggleSwitch();

//then you can call a method (where 'getValue' is the method you want to call)
var val = $('#toggle').toggleSwitch( 'getValue' );
````

Available methods:
````
- toggle: manually flip the switch

- turnOn: manually flip the switch on (or stay on, if already on)

- turnOff: manually flip the switch off (or stay off, if already off)

- getValue: get the current value of the switch (see 'values' option)

- disable: disable interaction with the toggle

- enable: re-enable interaction with the toggle (only needed if toggleSwitch has been disabled)
````

## Credit
2011 - v1.0 - Created by Luke Stebner; trying to make your life easier!