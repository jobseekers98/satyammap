
$(document).ready(function () {
    //debugger;
    LoadMarkers();
});

//function updateInput(ish)
//{
//    document.getElementById("studenteForm").value = ish;
//}
//onchange = "updateInput(this.value)"

function updateInput(ish1) {
    document.getElementById("drpList1").value = ish1;
}
onchange = "updateInput(this.value)"


//$('#btnsubmit')[0].reset();

var a;
var L1;
var Long1;
var L2;
var Long2;
function getlocation() {
    debugger;
    var places = new google.maps.places.Autocomplete(document.getElementById('txtLocation'));
    google.maps.event.addListener(places, 'place_changed', function () {
        var place = places.getPlace();
        var address = place.formatted_address;
        L1 = place.geometry.location.lat();
        Long1 = place.geometry.location.lng();

        var country;
        var city;
        var district;
        var Postal;
        var State;
        debugger;
        for (var i = 0; i < place.address_components.length; i++) {
            var find = false;
            for (var j = 0; j < place.address_components[i].types.length; j++) {
                if (place.address_components[i].types[j] == "postal_code") {
                    Postal = place.address_components[i].long_name;
                }

                else if (place.address_components[i].types[j] == "locality") {
                    city = place.address_components[i].long_name;
                }

                else if (place.address_components[i].types[j] == "administrative_area_level_2") {

                    district = place.address_components[i].long_name;
                }

                else if (place.address_components[i].types[j] == "administrative_area_level_1") {
                    State = place.address_components[i].long_name;
                  /*  alert(State);*/
                    if (State != null) { 
                        debugger;
                        $("#drpList option:selected").removeAttr("selected");
                        $("#drpList option:contains(" + State.toUpperCase() + ")").attr('selected', 'selected');
                        //$("#drpEmpList").val(State).attr("selected", "selected");
                        // $("#drpList").val(State);
                        //$('select[name^="salesrep"] option[value="Bruce Jones"]').attr("selected", "selected");
                    }
                }

                else if (place.address_components[i].types[j] == "country") {
                    country = place.address_components[i].long_name;
                }
            }
        }

        $("#idPostal").val(Postal);
        $("#idCity").val(city);
        $("#idDistrict").val(district);
        $("#drpEmpList").text(State);
        $("#idcountry").val(country);
        $("#Latitude").val(L1);
        $("#Longitude").val(Long1);

        //var marker =
        //{
        //    title: place,
        //    lat: L1,
        //    lng: Long1,
        //    description: address
        //}
        //markers.push(marker);
        //renderMap();

    });
}

function getlocationTwo() {
    //debugger;
    var places = new google.maps.places.Autocomplete(document.getElementById('txtLocationTwo'));
    google.maps.event.addListener(places, 'place_changed', function () {
        /*  a = place;*/
        var place1 = places.getPlace();
        var address = place1.formatted_address;
        L2 = place1.geometry.location.lat();
        Long2 = place1.geometry.location.lng();

        var country;
        var city;
        var district;
        var Postal;
        var State;
        debugger;
        for (var i = 0; i < place1.address_components.length; i++) {
            var find = false;
            for (var j = 0; j < place1.address_components[i].types.length; j++) {
                if (place1.address_components[i].types[j] == "postal_code") {
                    Postal = place1.address_components[i].long_name;
                }

                else if (place1.address_components[i].types[j] == "locality") {
                    city = place1.address_components[i].long_name;
                }

                else if (place1.address_components[i].types[j] == "administrative_area_level_2") {

                    district = place1.address_components[i].long_name;
                }

                else if (place1.address_components[i].types[j] == "administrative_area_level_1") {
                    State = place1.address_components[i].long_name;
                    //alert(State);
                    if (State !== null) {
                        $("#drpList1 option:selected").removeAttr("selected");
                        $("#drpList1 option:contains(" + State.toUpperCase() + ")").attr('selected', 'selected');
                        //$("#drpEmpList").val(State).attr("selected", "selected");
                        // $("#drpList").val(State);
                        //$('select[name^="salesrep"] option[value="Bruce Jones"]').attr("selected", "selected");
                    }
                }
                else if (place1.address_components[i].types[j] == "country") {
                    country = place1.address_components[i].long_name;
                }
            }
        }
        $("#idPostal1").val(Postal);
        $("#idCity1").val(city);
        $("#idDistrict1").val(district);
        $("#drpEmpList1").text(State);
        $("#idcountry1").val(country);
        $("#Latitude1").val(L2);
        $("#Longitude1").val(Long2);

        var calresult = calculateDistance();
        $("#txtResult").val(calresult);
        //var marker =
        //{
        //    title: place1,
        //    lat: L2,
        //    lng: Long2,
        //    description: address
        //}
        //markers.push(marker);
        //renderMap();
    });
}


function LoadMarkers() {

    $.ajax({
        type: 'GET',
        url: '/Home/GetData',
        //async: false,
        //contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // when we use .serialize() this generates the data in query string format. this needs the default contentType (default content type is: contentType: 'application/x-www-form-urlencoded; charset=UTF-8') so it is optional, you can remove it
        data: "",
        success: function (result) {
            //    //toastr.success('Successfully received Data ');
            //    toastr.success('Successfully received Data')
            //alert('Successfully received Data ');
            console.log('Get Markers success');
            console.log(result);
            //debugger;
            $.each(result, function (index, res) {
                //debugger;
                console.log(res);
                var marker =
                {
                    title: res.address1,
                    lat: res.latitude,
                    lng: res.longitude,
                }
                markers.push(marker);

            });
            renderMap();
        },
        error: function () {
            //alert('Failed to receive the Data');
            console.log('Get Markers failed');
        }
    })
};



function submitStudent() {


    if (!$("#studenteForm").valid()) {
        return false;
    }
    var data = $("#studenteForm").serialize();
    console.log(data);
    //console.log(data);
    // alert(data);
    $.ajax({
        type: 'POST',
        url: '/Home/TestAddress',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // when we use .serialize() this generates the data in query string format. this needs the default contentType (default content type is: contentType: 'application/x-www-form-urlencoded; charset=UTF-8') so it is optional, you can remove it
        data: data,
        success: function (result) {
            debugger;
            toastr.success('Successfully received Data ');
            $('#studenteForm')[0].reset();
            //toastr.success('Successfully received Data')
            //alert('Successfully received Data ');
            //console.log(result);
        },
        error: function () {
            alert('Failed to receive the Data');
            //console.log('Failed ');
        }

    });
}

function calculateDistance() {
    debugger;
    var origin = $("#txtLocation").val();
    var destination = $('#txtLocationTwo').val();
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
            // unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
            avoidHighways: false,
            avoidTolls: false,
        },
        callback
    );
}
// get distance results
function callback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {

        $("#result").html(err);
    } else {
        var origin = response.originAddresses[0];
        var destination = response.destinationAddresses[0];
        if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
            $("#result").html(
                " There are no roads between " +
                origin +
                " and " +
                destination
            );
        }
        else {
            debugger;
            var distance = response.rows[0].elements[0].distance;
            var duration = response.rows[0].elements[0].duration;
            var distance_in_kilo = distance.value / 1000; // the kilom
            var distance_in_mile = distance.value / 1609.34; // the mile
            var duration_text = duration.text;
            var duration_value = duration.value;
            $("#txtResult").val(
                distance_in_mile.toFixed(2)
            );
            //$("#txtResult").val(
            //    `Distance in Miles: ${distance_in_mile.toFixed(2)}`
            //);
            $("#kilo").html(
                `Distance in Kilometre: ${distance_in_kilo.toFixed(2)}`
            );
            $("#text").html(`Distance in Text: ${duration_text}`);
            $("#minute").html(`Distance in Minutes: ${duration_value}`);
            $("#from").html(`Distance From: ${origin}`);
            $("#to").text(`Distance to: ${destination}`);
            //$("#txtResult").val(`${distance_in_mile.toFixed(2)}`)
        }
        return distance_in_mile;
    }
}

var markers = [];
function renderMap() {
    //debugger;
    if (markers.length > 0) {
        var mapOptions = {
            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        var infoWindow = new google.maps.InfoWindow();
        var lat_lng = new Array();
        var latlngbounds = new google.maps.LatLngBounds();
        for (i = 0; i < markers.length; i++) {
            var data = markers[i]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            lat_lng.push(myLatlng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.title
            });

            latlngbounds.extend(marker.position);
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent(data.description);
                    infoWindow.open(map, marker);
                });
            })(marker, data);
        }

        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
        //***********ROUTING****************//
        //Initialize the Path Array
        var path = new google.maps.MVCArray();
        //Initialize the Direction Service
        var service = new google.maps.DirectionsService();
        // Set the Path Stroke Color
        var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
        ////Loop and Draw Path Route between the Points on MAP
        //for (var i = 0; i < lat_lng.length; i++) {
        //    if ((i + 1) < lat_lng.length) {
        //        var src = lat_lng[i];
        //        var des = lat_lng[i + 1];
        //        path.push(src);
        //        poly.setPath(path);
        //        service.route({
        //            origin: src,
        //            destination: des,
        //            travelMode: google.maps.DirectionsTravelMode.DRIVING
        //        }, function (result, status) {
        //            if (status == google.maps.DirectionsStatus.OK) {
        //                for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
        //                    path.push(result.routes[0].overview_path[i]);
        //                }
        //            }
        //        });
        //    }
        //}
    }
}

