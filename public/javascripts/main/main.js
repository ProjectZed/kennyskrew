var mainModule = angular.module('main', ['ui.router',
				'ngResource', 'ngSanitize','w5c.validator']);
mainModule.run(function($rootScope, $state, $http, $stateParams, $location,$timeout,$window) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
})

//states
mainModule.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
	$stateProvider.state('M_UD_DR_SCHED_START_RN_AID',{
		url : '/M_UD_DR_SCHED_START_RN_AID',
		templateUrl : '../M_UD_DR_SCHED_START_RN_AID'
	}).state('M_UD_DR_SCHED_STTS_RN_AID',{
		url : '/M_UD_DR_SCHED_STTS_RN_AID',
		templateUrl : '../M_UD_DR_SCHED_STTS_RN_AID'
	}).state('M_UD_DR_SCHED_VAL_END_RN_AID',{
		url : '/M_UD_DR_SCHED_VAL_END_RN_AID',
		templateUrl : '../M_UD_DR_SCHED_VAL_END_RN_AID'
	}).state('M_UD_DR_SCHED_VAL_START_RN_AID',{
		url: '/M_UD_DR_SCHED_VAL_START_RN_AID',
		templateUrl : '../M_UD_DR_SCHED_VAL_START_RN_AID'
	}).state('M_UD_DR_SCHED_SLA_AID',{
		url: '/M_UD_DR_SCHED_SLA_AID',
		templateUrl : '../M_UD_DR_SCHED_SLA_AID'
	}).state('M_UD_DR_SCHED_SLA_RN',{
		url: '/M_UD_DR_SCHED_SLA_RN',
		templateUrl : '../M_UD_DR_SCHED_SLA_RN'
	}).state('M_UD_DR_SCHED_H_SLA_RN',{
		url: '/M_UD_DR_SCHED_H_SLA_RN',
		templateUrl : '../M_UD_DR_SCHED_H_SLA_RN'
	}).state('M_UD_DR_STEP_DTL_RN_GN',{
		url: '/M_UD_DR_STEP_DTL_RN_GN',
		templateUrl : '../M_UD_DR_STEP_DTL_RN_GN'
	}).state('M_UD_DR_STEP_DTL_RN_STP_DTL_ID',{
		url: '/M_UD_DR_STEP_DTL_RN_STP_DTL_ID',
		templateUrl : '../M_UD_DR_STEP_DTL_RN_STP_DTL_ID'
	}).state('M_UD_DR_STEP_ASI_SID',{
		url: '/M_UD_DR_STEP_ASI_SID',
		templateUrl : '../M_UD_DR_STEP_ASI_SID'
	}).state('M_UD_DR_STEP_ASI_RN_SID',{
		url: '/M_UD_DR_STEP_ASI_RN_SID',
		templateUrl : '../M_UD_DR_STEP_ASI_RN_SID'
	}).state('M_UD_DR_STEP_ASI_RN',{
		url: '/M_UD_DR_STEP_ASI_RN',
		templateUrl : '../M_UD_DR_STEP_ASI_RN'
	}).state('M_UD_DR_STEP_ASI_RN_GN',{
		url: '/M_UD_DR_STEP_ASI_RN_GN',
		templateUrl : '../M_UD_DR_STEP_ASI_RN_GN'
	}).state('M_DL_DR_SCHED_RN',{
		url: '/M_DL_DR_SCHED_RN',
		templateUrl : '../M_DL_DR_SCHED_RN'
	}).state('M_DL_DR_STEP_RN',{
		url: '/M_DL_DR_STEP_RN',
		templateUrl : '../M_DL_DR_STEP_RN'
	}).state('M_DL_DR_STEP_RN_GN',{
		url: '/M_DL_DR_STEP_RN_GN',
		templateUrl : '../M_DL_DR_STEP_RN_GN'
	}).state('M_DL_DR_STEP_RN_SID',{
		url: '/M_DL_DR_STEP_RN_SID',
		templateUrl : '../M_DL_DR_STEP_RN_SID'
	}).state('M_DL_DR_STEP_DTL_RN',{
		url: '/M_DL_DR_STEP_DTL_RN',
		templateUrl : '../M_DL_DR_STEP_DTL_RN'
	}).state('addDriverScedule',{
		url: '/addDriverScedule',
		templateUrl : '../addDriverScedule'
	}).state('addDriverStep',{
		url: '/addDriverStep',
		templateUrl : '../addDriverStep'
	}).state('viewfailures',{
		url: '/viewfailures',
		templateUrl : '../viewfailures'
	}).state('undo',{
		url: '/undo',
		templateUrl : '../undo'
	}).state('peerReview',{
		url: '/peerReview',
		templateUrl : '../peerReview'
	})
}])
