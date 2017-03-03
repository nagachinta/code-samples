(function(){
    'use strict';
    angular.module('pageInfo').config(function($compileProvider){
       
       $compileProvider.aHrefSanitizationWhitelist(/^[\s*(sms):] || [\s*(whatsapp):]/);
    }).controller('pageInfoCtrl',['$scope','$state','Storage','widgetData',pageInfoCtrl]);

    function pageInfoCtrl($scope,$state,Storage, widgetData) {

        var pageInfoVm = this;
        pageInfoVm.date = {};
        pageInfoVm.sender = {};
        pageInfoVm.receiver = {};
        pageInfoVm.paymentDetails = {};

        function prependZero(numberCode){
            if(numberCode && numberCode.length == 1){
                return  "0"+numberCode;
            }else{
                return numberCode;
            }
        }

        function centsToDollars(cents){
            return (cents/100).toFixed(2);
        }


        function setDate() {
            var date = new Date();
            var currentDate = date.getDate();
            var dayStr = '';

            if(currentDate == '1' || currentDate == '21' || currentDate == '31'){
                dayStr = 'st';
            }else if(currentDate == '2' || currentDate == '22'){
                dayStr = 'nd';
            }else if(currentDate == '3' || currentDate == '23'){
                dayStr = 'rd';
            }else{
                dayStr = 'th';
            }

            var year = date.getFullYear();
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";

            pageInfoVm.date['month'] = month[date.getMonth()];
            pageInfoVm.date['day'] = currentDate;
            pageInfoVm.date['dayStr'] = dayStr;
            pageInfoVm.date['year'] = year;
        }

        
        function startNewTransaction(){
            switch(pageInfoVm.userJourney){
                case 'payment':
                    $state.go("paymentStartPage");
                    break;
                default:
                    $state.go("defaultPage");
            }
        }

        
        function closeModal(){
            $("#page-modal").modal("hide")
        }

        function setReceiverEmail(receiverEmail){
            pageInfoVm.receiver.email = receiverEmail;
        }
        

        function num334Format(number){
            return number.substring(0,3)+" "+number.substring(3,6)+" "+number.substring(6);
        }

        function numberTransfer(number) {
            var num = (parseInt(number) / 100).toString();
            return Number(num).toFixed(2);
        }

        function onPageLoad(){
            pageInfoVm.userJourney = Storage.getuserJourney();
            getPageDetails();
        }

        function returnToProfile(){
            Navigator.redirectTo("profile");
        }


        function setDateAvailable(dateAvailable){
            var mm = dateAvailable.substring(0,2);
            var dd = dateAvailable.substring(2,4);
            var yyyy = dateAvailable.substring(4,8);
            var dateStr = CONST_MONTHS.MONTH_NAMES[mm-1]+" "+dd+", "+yyyy;

            pageInfoVm.destinationAvailableDate = dateStr;
        }

        onPageLoad();

    }
})();
