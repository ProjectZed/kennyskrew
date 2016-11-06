var app = angular.module('digitalDash', ['ngRoute']);

app.config(function($routeProvider) {
      $routeProvider
      .when("/M_UD_DR_SCHED_START_RN_AID", {
          templateUrl: "template/M_UD_DR_SCHED_START_RN_AID.html",
          controller: "scheduleTime"
      })
      .when("/M_UD_DR_SCHED_STTS_RN_AID", {
          templateUrl: "template/M_UD_DR_SCHED_STTS_RN_AID.html",
          controller: "statusCode"
      })
      .when("/M_UD_DR_SCHED_VAL_END_RN_AID", {
          templateUrl: "template/M_UD_DR_SCHED_VAL_END_RN_AID.html",
          controller: "valuationEnd"
      })
      .when("/M_UD_DR_SCHED_VAL_START_RN_AID", {
          templateUrl: "template/M_UD_DR_SCHED_VAL_START_RN_AID.html",
          controller: "valuationStart"
      })
      .when("/M_UD_DR_SCHED_SLA_AID", {
          templateUrl: "template/M_UD_DR_SCHED_SLA_AID.html",
          controller: "sla_by_audit"
      })
      .when("/M_UD_DR_SCHED_SLA_RN", {
          templateUrl: "template/M_UD_DR_SCHED_SLA_RN.html",
          controller: "sla_by_runname"
      })
      .when("/M_UD_DR_SCHED_H_SLA_RN", {
          templateUrl: "template/M_UD_DR_SCHED_H_SLA_RN.html",
          controller: "histoy_SLA"
      })
      .when("/M_UD_DR_STEP_DTL_RN_GN", {
          templateUrl: "template/M_UD_DR_STEP_DTL_RN_GN.html",
          controller: "status_name_grpNumder"
      })
      .when("/M_UD_DR_STEP_DTL_RN_STPDTLID", {
          templateUrl: "template/M_UD_DR_STEP_DTL_RN_STPDTLID.html",
          controller: "status_name_dtlID"
      })
      .when("/M_UD_DR_STEP_ASI_SID", {
          templateUrl: "template/M_UD_DR_STEP_ASI_SID.html",
          controller: "active_step_indicator_stepID"
      })
      .when("/M_UD_DR_STEP_ASI_RN_SID", {
          templateUrl: "template/M_UD_DR_STEP_ASI_RN_SID.html",
          controller: "active_step_indicator_runName_stepID"
      })
      .when("/M_UD_DR_STEP_ASI_RN", {
          templateUrl: "template/M_UD_DR_STEP_ASI_RN.html",
          controller: ""
      })
      .when("/M_UD_DR_STEP_ASI_RN_GN", {
          templateUrl: "template/M_UD_DR_STEP_ASI_RN_GN.html",
          controller: ""
      })

      //more route for ADD and DELETE

  });
