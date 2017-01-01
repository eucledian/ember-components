/* globals Blob */
import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('file-upload', 'Unit | Integration | file upload', {
  integration: true
});

test('it reads upload', function(assert){
  this.render(hbs`{{file-upload}}`);
  let input = $('input[type=file]');

  let blob = new Blob(['foo', 'bar'], { type: 'image/png'});
  blob.name = "test.png";

  input.triggerHandler({
    type: 'change',
    target: {
      files: {
        0: blob,
        length: 1,
        item(){ return blob; }
      }
    }
  });

  return wait().then(() => {
    assert.equal(input.data('value'), 'data:image/png;base64,Zm9vYmFy');
  });
});
