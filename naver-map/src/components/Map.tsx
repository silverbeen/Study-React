import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { mapListState } from "../lib/atom/map";

const Map = () => {
  const mapList = useRecoilValue(mapListState);
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      window.alert("현재위치를 알수 없습니다.");
    }
  }, []);

  useEffect(() => {
    if (typeof myLocation !== "string") {
      const currentPosition = [myLocation.latitude, myLocation.longitude]; // 현재 내 위치 추척

      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomControl: true,
      });

      // 내 장소 위치
      const test = new naver.maps.Marker({
        position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        map: map,
        icon: {
          url: "w7.pngwing.com/pngs/731/25/png-transparent-location-icon-computer-icons-google-map-maker-marker-pen-cartodb-map-marker-heart-logo-color-thumbnail.png",
          size: new naver.maps.Size(33, 44),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(11, 35),
        },
      });

      mapList.map((item: any) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(item.y, item.x),
          map: map,
        });
      });
    }
  }, [mapList, myLocation]);

  return <div id="map" style={{ width: "70%", height: "100vh" }} />;
};

export default Map;
