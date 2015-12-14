import {
Component,
View,
ViewEncapsulation,
Host,
SkipSelf,
Attribute,
Optional,
OnChanges,
OnInit
} from 'angular2/core';
import {isPresent, StringWrapper, NumberWrapper} from 'angular2/src/facade/lang';
import {ObservableWrapper, EventEmitter} from 'angular2/src/facade/async';
import {Event, KeyboardEvent} from 'angular2/src/facade/browser';
import {RadioDispatcher} from './radio_dispatcher';
import {RadioGroup} from './radio_group';

import {KeyCodes} from './../../../common/keycodes.ts';
 

var _uniqueRadioCounter: number = 0;

let template = require('./radio_button.html');
let styles = require('./radio_button.scss');

@Component({
  selector: 'radio-button',
  inputs: ['id', 'name', 'value', 'checked', 'disabled'],
  host: {
    'role': 'radio',
    '[id]': 'id',
    '[tabindex]': 'tabindex',
    '[attr.aria-checked]': 'checked',
    '[attr.aria-disabled]': 'disabled',
    '(keydown)': 'onKeydown($event)',
  }
})
@View({
    template: template,
  styles:[styles],  
  encapsulation: ViewEncapsulation.None
})
export class RadioButton implements OnInit {
  checked: boolean;
  disabled_: boolean;
  id: string;
  name: string;
  value: any;
  radioGroup: RadioGroup;
  radioDispatcher: RadioDispatcher;
  tabindex: number;

  constructor(
    @Optional() @SkipSelf() @Host() radioGroup: RadioGroup,
    @Attribute('id') id: string,
    @Attribute('tabindex') tabindex: string,
    radioDispatcher: RadioDispatcher

  ) {
    this.radioGroup = radioGroup;
    this.radioDispatcher = radioDispatcher;
    this.value = null;
    this.checked = false;
    this.id = isPresent(id) ? id : `md-radio-${_uniqueRadioCounter++}`;
    
    radioDispatcher.listen((name) => {
      
      if (name == this.name) {
        this.checked = false;
      }
    });
    if (isPresent(radioGroup)) {
      this.name = radioGroup.getName();
      this.radioGroup.register(this);
    }
    if (!isPresent(radioGroup)) {
      this.tabindex = isPresent(tabindex) ? NumberWrapper.parseInt(tabindex, 10) : 0;
    } else {
      this.tabindex = -1;
    }
  }
  
  
  ngOnInit() {
    if (isPresent(this.radioGroup)) {
      this.name = this.radioGroup.getName();
    }
  }

  /** Whether this radio button is disabled, taking the parent group into account. */
  isDisabled(): boolean {
    // Here, this.disabled may be true/false as the result of a binding, may be the empty string
    // if the user just adds a `disabled` attribute with no value, or may be absent completely.
    // TODO(jelbourn): If someone sets `disabled="disabled"`, will this work in dart?
    return this.disabled || (isPresent(this.disabled) && StringWrapper.equals(this.disabled, '')) ||
           (isPresent(this.radioGroup) && this.radioGroup.disabled);
  }

  get disabled(): any {
    return this.disabled_;
  }

  set disabled(value: any) {
    this.disabled_ = isPresent(value) && value !== false;
  }

  /** Select this radio button. */
  select(event: Event) {
    if (this.isDisabled()) {
      event.stopPropagation();
      return;
    }

    // Notifiy all radio buttons with the same name to un-check.
    this.radioDispatcher.notify(this.name);

    this.checked = true;

    if (isPresent(this.radioGroup)) {
      this.radioGroup.updateValue(this.value, this.id);
    }
  }

  /** Handles pressing the space key to select this focused radio button. */
  onKeydown(event: KeyboardEvent) {
    if (event.keyCode == KeyCodes.SPACE) {
      event.preventDefault();
      this.select(event);
    }
  }
}

