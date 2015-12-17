import {TopNav} from './top_nav/top_nav';
import {SideNav} from './side_nav/side_nav';
import {HistoricalView} from './historical_view/historical_view';
import {HTMLView} from './html_view/html_view';
import {EditBar} from './edit_bar/edit_bar';
import {Comments} from './comments/comments';
import {ColourDisplayer} from './colour_displayer/colour_displayer'
import {FontDisplayer} from './font_displayer/font_displayer';
import {DropZone} from './drop_zone/drop_zone';
import {AddPattern} from './add_pattern/add_pattern';
import {AddComponent} from './add_component/add_component.ts';
import {FormComponent} from './form_component/form_component.ts';
import {TextEdit} from './text_edit/text_edit';
import {TextBlock} from './text_block/text_block';
import {UrlCreatorInput} from './url_creator/url_creator';
import {ComponentConfig} from './component_config/component_config.ts';
import {AutoComplete, AutocompleteOption} from './autocomplete/autocomplete_modules.ts';

export * from './top_nav/top_nav';
export * from './side_nav/side_nav';
export * from './historical_view/historical_view';
export * from './html_view/html_view';
export * from './edit_bar/edit_bar';
export * from './comments/comments';
export * from './colour_displayer/colour_displayer'
export * from './font_displayer/font_displayer';
export * from './drop_zone/drop_zone';
export * from './add_pattern/add_pattern';
export * from './add_component/add_component.ts';
export * from './form_component/form_component.ts';
export * from './text_edit/text_edit';
export * from './text_block/text_block';
export * from './url_creator/url_creator';
export * from './component_config/component_config.ts';
export * from './autocomplete/autocomplete_modules.ts';


export var SHARED_COMPONENTS: Array<any> = [
	AutoComplete,
	AutocompleteOption,
	TopNav,
	SideNav,
	HistoricalView,
	HTMLView,
	EditBar,
	Comments,
	ColourDisplayer,
	FontDisplayer,
	DropZone,
	AddPattern,
	AddComponent,
	FormComponent,
	TextEdit,
	TextBlock,
	UrlCreatorInput,
	ComponentConfig,
	
]

