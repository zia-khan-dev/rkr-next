const googleMapsUrl = "https://www.google.com/maps/place/Naeem+Shaheed+St,+Ittehad+Colony+Lahore,+Punjab+54000,+Pakistan/@31.5259141,74.2912434,16z/data=!4m6!3m5!1s0x3919031347bd30df:0x25d0f9e1ae4e9629!8m2!3d31.5269139!4d74.2875511!16s%2Fg%2F1hhgq8ks6";
function extractLatLong(url) {
    const parts = url.split('@')[1];
    if (parts) {
        const latLong = parts.split(',')[0] + ',' + parts.split(',')[1]; // Combining latitude and longitude
        return latLong; // This will be a string like "31.5259141,74.2912434"
    }
    return null;
}

const latLongString = extractLatLong(googleMapsUrl);

if (latLongString) {
    const [latitude, longitude] = latLongString.split(',').map(Number);
    // Now you can use latitude and longitude as numbers
    console.log("Latitude:", latitude, "Longitude:", longitude);
}
