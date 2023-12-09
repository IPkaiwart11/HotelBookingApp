import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=raipur,bilaspur,korba"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/81/Naya_Raipur%2C_Sector_19.png"
              alt="raipur"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Raipur</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://www.shutterstock.com/image-photo/bilaspur-chhattisgarh-india-july-09-260nw-2008267478.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Bilaspur</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/62/f6/67/getlstd-property-photo.jpg?w=600&h=400&s=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Korba</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
