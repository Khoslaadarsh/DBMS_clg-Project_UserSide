
$(document).ready(function () {

    // Straight Line distance between two lat lon
    function distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") { dist = dist * 1.609344 }
            if (unit == "N") { dist = dist * 0.8684 }
            return dist;
        }
    }

    // adding serial number to the entries of the table
    var addSerialNumber = function () {
        $('table tr').each(function (index) {
            $(this).find('td:nth-child(1)').html(index++);
        });
    };
    addSerialNumber();

    // Calcel Ticket button 
    $("#myTable").on('click', '.calcelTicket', function () {
        // get current row
        var currentRow = $(this).closest("tr");
        console.log(currentRow.find('td:eq(1)').html());

        var id = currentRow.find('td:eq(1)').html();
        var tno = currentRow.find('td:eq(2)').html();
        $(`<form action="/deleteTicket/${id}/${tno}" method = "POST"></form>`).appendTo('body').submit();


    })

    // finding lat lon using api and then calculating straight line distance between them to find out the fare @8 per km 
    var lat1, lat2, lon1, lon2;
    console.log("hello");
    var st1 = document.getElementById("from_").innerHTML;
    var st2 = $("#to_").innerHTML;
    var ur1 = `http://api.positionstack.com/v1/forward?access_key=e2e05ff4557d26f9e109ca91780af508&query=` + st1 + ` India&limit=1`
    var ur2 = `http://api.positionstack.com/v1/forward?access_key=e2e05ff4557d26f9e109ca91780af508&query=` + st2 + ` India&limit=1`
    $.ajax({
        type: "GET",
        url: ur1,
        dataType: "json",
        success: function (result, status, xhr) {
            lat1 = result["data"]['0']["latitude"];
            lon1 = result["data"]['0']["longitude"];
            $.ajax({
                type: "GET",
                url: ur2,
                dataType: "json",
                success: function (result, status, xhr) {
                    lat2 = result["data"]['0']["latitude"];
                    lon2 = result["data"]['0']["longitude"];
                    $('table tr').each(function () {
                        $(this).find('td:nth-child(5)').html(Math.round(8 * distance(lat1, lon1, lat2, lon2)));
                    });
                },
                error: function (xhr, status, error) {
                    alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                }
            });
        },
        error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });


    // filling value (Fare, Train number, Train Name) in the form for the ticket booking
    $("#myTable").on('click', '.bookTicket', function () {
        // get current row
        var currentRow = $(this).closest("tr");
        console.log(currentRow.find('td:eq(1)').html());
        document.getElementById('tno').value = currentRow.find('td:eq(3)').html();
        document.getElementById('tname').value = currentRow.find('td:eq(1)').html();
        document.getElementById('fare').value = currentRow.find('td:eq(4)').html();
    })


})