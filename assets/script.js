

(function () {


    // setting year and month

    var year = new Date().getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = monthNames[new Date().getMonth()];
    document.querySelector('.hero-time').textContent = month + ", " + year + ";";


    // clearing and declaring

    var total = document.querySelector('.hero-total');
    var totalIncome = document.querySelector('.i-text');
    var totalExpences = document.querySelector('.e-text');
    var mainPercentage = document.querySelector('.main-percentage');


    //clearing

    total.textContent = "+ 0.00";
    totalIncome.textContent = "+ 0.00";
    totalExpences.textContent = "- 0.00";
    mainPercentage.textContent = "...";


    //tick button click event

    document.querySelector('.btn-primary').addEventListener('click', function () {
        globalEventFunction();
    });


    // enter button press event

    document.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            globalEventFunction();
        }
    });


    //delete button event

    document.querySelector('.details').addEventListener('click', function (e) {
        var ie = e.target.parentElement.parentElement.parentElement.id;
        var id = e.target.parentElement.parentElement.id;
        if (ie == "income") {
            list.iList.splice(Number(id), 1);
            listCreator();
        }else if (ie == "expenses") {
            list.eList.splice(Number(id), 1);
            listCreator();
        }
    })


    //total lists

    var list = {
        iList: [],
        eList: []
    }

    //all event handler

    function globalEventFunction() {


        //declaring

        var selectWrapper = document.querySelector('.selector');
        var textWrapper = document.querySelector('.text-wrapper');
        var numberWrapper = document.querySelector('.number-wrapper');

        if (numberWrapper.value !== "" && numberWrapper.value > 0) {
            if (selectWrapper.value == 'i') {
                // write some code
                list.iList.push([textWrapper.value, numberWrapper.value]);
                listCreator();



            } else {
                // write some code
                list.eList.push([textWrapper.value, numberWrapper.value]);
                listCreator();

            }
        }


        //clearing fields

        textWrapper.value = "";
        numberWrapper.value = "";
    };


    function listCreator() {

        function income() {
            var totalI = 0;
            for (let i = 0; i < list.iList.length; i++) {
                totalI += Number(list.iList[i][1]);
            }
            return totalI;
        }
        function expences() {
            var totalE = 0;
            for (let i = 0; i < list.eList.length; i++) {
                totalE += Number(list.eList[i][1]);
            }
            return totalE;
        }
        function convertTo(num) {
            if (num >= 0) {
                return "+ " + String(num.toFixed(2));
            } else {
                return "- " + String((num * -1).toFixed(2));
            }
        }
        function calculatePercentage(num) {
            var per = Math.round(num * 100 / income());
            if (per == 0 || per == Infinity || isNaN(per)) {
                return "...";
            } else {
                return String(per) + "%";
            }
        }
        totalIncome.textContent = convertTo(income());
        totalExpences.textContent = convertTo(expences() * -1);
        total.textContent = convertTo(income() - expences());
        mainPercentage.textContent = calculatePercentage(expences());

        var incomeHTML = document.querySelector('.income-html');
        var expencesHTML = document.querySelector('.expenses-html');


        incomeHTML.textContent = "";
        expencesHTML.textContent = "";

        var addHTML;

        for (var i = 0; i < list.iList.length; i++) {
            addHTML = '<div class="alert alert-success mt-1 clearfix" role="alert" id="' + i + '"><span>' + list.iList[i][0] + '</span><button type="button" class="close" aria-label="Close" style="float: right"><span aria-hidden="true">&times;</span></button><span style="float: right;" class="pr-3">' + convertTo(Number(list.iList[i][1])) + '</span></div>';
            incomeHTML.insertAdjacentHTML('beforeend', addHTML);
        }
        for (var i = 0; i < list.eList.length; i++) {
            addHTML = '<div class="alert alert-danger clearfix" role="alert" id="' + i + '"><span>' + list.eList[i][0] + '</span><button type="button" class="close" aria-label="Close" style="float: right"><span aria-hidden="true">&times;</span></button><span class="e-percentage px-1 mr-2" style="font-size: 80%;">' + calculatePercentage( Number(list.eList[i][1])) + '</span><span style="float: right;" class="pr-2">' + convertTo(-1 * Number(list.eList[i][1])) + '</span></div>';
            expencesHTML.insertAdjacentHTML('beforeend', addHTML);
        }


    }
})();