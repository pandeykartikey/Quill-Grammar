'use strict';

module.exports = [
  {
    type: 'text',
    label: 'Name',
    model: 'name',
    required: true
  },
  {
    type: 'textarea',
    label: 'Explanation',
    model: 'explanation',
    required: true
  },
  require('./../../base_models/standard.model.js'),
  require('./../../base_models/standards_level.model.js'),
  require('./../../base_models/concept_level_2.model.js'),
  require('./../../base_models/concept_level_1.model.js'),
  {
    type: 'submit',
    label: 'Submit Concept',
    model: 'submit'
  }
];