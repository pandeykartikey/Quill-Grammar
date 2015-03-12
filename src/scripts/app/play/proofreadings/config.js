'use strict';

module.exports =
/*@ngInject*/
function configure ($stateProvider) {
  $stateProvider
  .state('play-pf', {
    parent: 'app',
    templateUrl: 'proofreadings.play.html',
    controller: 'ProofreadingPlayCtrl',
    url: '/play/pf?uid&brainpop'
  })
  .state('play-partner-pf-integration-start', {
    parent: 'app',
    templateUrl: 'proofreadings.partner.html',
    url: '/play/partner-pf'
  });
};