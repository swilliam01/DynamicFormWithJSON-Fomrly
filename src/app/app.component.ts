import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
// import { takeUntil, startWith, tap } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  onDestroy$ = new Subject<void>();
  form = new FormGroup({});
  model: any = { };
options: FormlyFormOptions = {
  formState: {
    selectOptionsData: {
      states: [
        { id: '1', name: 'Punjab', countryId: '1' },
        { id: '2', name: 'Sindh', countryId: '1' },
        { id: '3', name: 'Maryland', countryId: '2' },
        { id: '4', name: 'Florida', countryId: '2' },
      ],

      cities: [
        { id: '1', name: 'Lahore', stateId: '1' },
        { id: '2', name: 'Islamabad', stateId: '1' },
        { id: '3', name: 'Karachi', stateId: '2' },
        { id: '4', name: 'Hyderabad', stateId: '2' },
        { id: '5', name: 'Gaithersburg', stateId: '3' },
        { id: '6', name: 'Bethasda', stateId: '3' },
        { id: '7', name: 'Miami', stateId: '4' },
        { id: '8', name: 'Orlando', stateId: '4' },
      ]

    }
  }
};

fields: FormlyFieldConfig[] = [

  {
    key: 'country',
    type: 'select',
    templateOptions: {
      label: 'Country',
      options: [  
        {id: '1', name: 'Pakistan'},
        {id: '2', name: 'United States of America'}
      ],
      valueProp: 'id',
      labelProp: 'name',
    }
  },

  {
    key: 'state',
    type: 'select',
    templateOptions: {
      label: 'State',
      options: [],
      valueProp: 'id',
      labelProp: 'name',
    },
    expressionProperties: {
      'templateOptions.options': 'formState.selectOptionsData.states.filter(state => state.countryId === model.country)',
      // reset model when updating select options
      'model.state': `field.templateOptions.options.find(o => o.id === model.state) ? model.state:null`,
    },  
    hideExpression: '!model.country',

  },

  {
    key: 'city',
    type: 'select',
    templateOptions: {
      label: 'City',
      options: [],
      valueProp: 'id',
      labelProp: 'name',
    },
    expressionProperties: {
      'templateOptions.options': 'formState.selectOptionsData.cities.filter(city => city.stateId === model.state)',
      // reset model when updating select options
      'model.city': `field.templateOptions.options.find(o => o.id === model.city) ? model.city:null`,
    },
    hideExpression: '!model.state',

  },


]
submit() {
  alert(JSON.stringify(this.model));
}

}
