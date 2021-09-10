import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {decode} from 'html-entities';
import hdate from "human-date";

function Url(props) {
  const [ url, setUrl ] = useState({});
  const [ min, setMin ] = useState(0);
  let data = useLocation();
  useEffect(() => {
    axios
      .get("http://localhost:3001/url/find", {
        params: {
          id: data.state.id,
        },
      })
      .then((dt) => {
          setUrl(dt.data);
          let i=0;
          let m=0;
          if (url.values) {
            url.values.forEach((u) => {
                if(u===url.minimum_value) {
                m=i;
              }
              i++;
            });
          }
          setMin(m);
        });
  });
  return <>
    <div class="row image-col">
      <div class="offset-2 col-3">
        <img class="image" src={url.imageUrl} alt="urlImage" />
      </div>
      <div class="offset-1 col-4 mid-text">
        <div class="row">
          <h2 class="productName col-12">{decode(url.name)}</h2><br />
          <h3 class="productMin col-12">Minimum Price: INR {url.minimum_value}, Last ovserved at: {url.dates && hdate.prettyPrint(url.dates[min])}</h3>
          <h3 class="productCurrent col-12">Latest Price: INR {url.values && url.values.slice(-1)}, On: {url.dates && hdate.prettyPrint(url.dates.slice(-1))}</h3>
          <button class="btn btn-primary">Track Product</button>
        </div>
      </div>
    </div>
  </>;
}

export default Url;
