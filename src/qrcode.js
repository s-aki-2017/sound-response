import React, {useState, useEffect} from 'react';

export default function Qrcode(){
    return (
        <div>
            <img src={"https://chart.apis.google.com/chart?cht=qr&chs=260x260&chl="+window.location.href}></img>
        </div>
    );
} 
