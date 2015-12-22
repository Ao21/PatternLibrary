export * from './tab/tab_modules';
export * from './radio/radio_modules';
export * from './select_dropdown/select_dropdown_modules';

import {Tab,TabsGroup} from './tab/tab_modules';
import {RadioButton, RadioGroup} from './radio/radio_modules';
import {ComponentLoader} from './component_loader/component_loader';
import {PatternLoader} from './pattern_loader/pattern_loader';
import {PlaceHolder} from './placeholder_component/placeholder_component';
import {FormLoader} from './form_loader/form_loader';
import {QuillEditor} from './quill/quill';
import {SelectDropdown, SelectItem} from './select_dropdown/select_dropdown_modules';

export var BASE_COMPONENTS: Array<any> = [
	Tab,
	TabsGroup,
	RadioButton,
	RadioGroup,
	ComponentLoader,
	PatternLoader,
	PlaceHolder,
	FormLoader,
	QuillEditor,
	SelectDropdown,
	SelectItem
]
