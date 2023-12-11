import { useState } from "react";
import Resizer from "react-image-file-resizer";
import JSZip from "jszip";

const App = () => {
  const [width, setWidth] = useState(460);
  const [height, setHeight] = useState(695);
  const [quality, setQuality] = useState(80);
  const [newImages, setNewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "width") setWidth(value);
    else if (name === "height") setHeight(value);
    else if (name === "quality") setQuality(value);
  };

  const fileChangedHandler = (event) => {
    const files = event.target.files;

    if (files && files.length) {
      const resizedImages = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        try {
          Resizer.imageFileResizer(
            file,
            width,
            height,
            "JPEG",
            quality,
            0,
            (uri) => {
              resizedImages.push(uri);

              if (resizedImages.length === files.length) {
                setNewImages(resizedImages);
              }
            },
            "base64",
            200,
            200
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const downloadImages = () => {
    const zip = new JSZip();

    newImages.forEach((image, index) => {
      zip.file(`TaraHuraLife${index + 1}.jpeg`, image.split(",")[1], { base64: true });
    });

    zip.generateAsync({ type: "blob" }).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "TaraHuraLife.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    
    <div>
      <h1 className="text-6xl font-extrabold text-white text-center bg-[#291334] pt-5 h-28">Image Resizer</h1> <hr className="mb-5"/>
      <h2 className="text-4xl font-bold text-center mb-5 mt-20">Select Your Preferences</h2>
      <form className="flex justify-between max-w-5xl mx-auto">
        <div className="flex items-center">
          <h3 className="text-lg font-bold bg-[#291334] text-[#C2C4D3] px-4 py-[10px] rounded-l-lg max-h-[48px] min-w-fit gap-2">
            Width <sup>(px)</sup>
          </h3>
          <input
            type="number"
            placeholder="Width"
            name="width"
            className="input input-bordered w-full max-w-xs rounded-r-lg rounded-l-none focus:outline-none"
            value={width}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center">
          <h3 className="text-lg font-bold bg-[#291334] text-[#C2C4D3] px-4 py-[10px] rounded-l-lg max-h-[48px] min-w-fit gap-2">
            Height <sup>(px)</sup>
          </h3>
          <input
            type="number"
            placeholder="Height"
            name="height"
            className="input input-bordered w-full max-w-xs rounded-r-lg rounded-l-none focus:outline-none"
            value={height}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center">
          <h3 className="text-lg font-bold bg-[#291334] text-[#C2C4D3] px-4 py-[10px] rounded-l-lg max-h-[48px] min-w-fit gap-2">
            Quality <sup>%</sup>
          </h3>
          <input
            type="number"
            placeholder="Quality"
            name="quality"
            className="input input-bordered w-full max-w-xs rounded-r-lg rounded-l-none focus:outline-none"
            value={quality}
            onChange={handleChange}
          />
        </div>
      </form>

      <h3 className="text-4xl font-bold text-center mb-5 mt-20">Resize Your Images</h3>

      <div className="flex flex-col items-center">
      <input type="file" onChange={fileChangedHandler} multiple className="file-input file-input-bordered w-full max-w-xs rounded-lg focus:outline-none" />
        {newImages.length > 0 && <button onClick={downloadImages} className="btn btn-neutral rounded-lg mt-10 mb-10">
          Download All Resized Images
        </button>}
      </div>
      <div className="px-10 flex flex-wrap gap-5">
      {newImages.map((image, index) => (
        <img key={index} src={image} alt={`TaraHuraLife${index + 1}`} />
      ))}
      </div>
      <footer>
      <p className="text-center mt-20 mb-5">Developed by <a href="https://www.facebook.com/MdAbKaderHadi" className="underline">Md. Ab. Kader Hadi</a></p>
      </footer>
    </div>
  );
};

export default App;
