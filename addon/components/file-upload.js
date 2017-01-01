import Ember from 'ember';
import layout from '../templates/components/file-upload';

export default Ember.Component.extend({
  layout,
  maxFileSize: 5,
  allowedExtensions: ['jpg', 'png', 'pdf'],
  filename: null,
  fileValue: null,
  label: null,
  unallowedFileType: false,
  error: false,
  exceedsSize: false,
  value: null,
  computedSize: Ember.computed('maxFileSize', function(){
    return this.get('maxFileSize') * 1024 * 1024;
  }),
  actions: {
    selectFile(e){
      const reader = new FileReader();
      const file = e.target.files[0];
    
      if (file === undefined){
        this.set('value', undefined);
        return false;
      }
      
      let fileData;
      let fileExtension = file.name.split('.')[file.name.split('.').length - 1];
      
      this.set('filename', file.name);
      this.set('exceedsFileSize', file.size > this.get('computedSize'));
      this.set('unallowedFileType', this.get('allowedExtensions').indexOf(fileExtension) === -1);
      
      if(this.get('exceedsSize') || this.get('unallowedFileType')){
        this.set('error', true);
        e.target.value = '';
        return false;
      }
      
      reader.onload = ()=>{
        fileData = reader.result;
        this.set('value', fileData);
      };
      
      if (file){
        reader.readAsDataURL(file);
      }
    }
  }
});

