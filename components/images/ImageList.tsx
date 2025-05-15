import { ImageInterface } from "@/interfaces/Image";
import { Command } from "@tauri-apps/plugin-shell";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useData } from "@/app/context/DataContext";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
function ImageList() {
  const [isLoading, setIsLoading] = useState(true);
  const { imageArr, setImageArr } = useData();
  const loadImages = async () => {
    try {
      const imageFetchCommand = Command.create("docker", [
        "images",
        "--format",
        "{{.Repository}}|||{{.Tag}}|||{{.ID}}|||{{.CreatedSince}}|||{{.Size}}",
      ]);
      const cmdStatus = await imageFetchCommand.spawn();
      let tempArray: ImageInterface[] = [];
      imageFetchCommand.stdout.on("data", (data) => {
        let dataArray = data.toString().split("|||");
        let tempImageObject: ImageInterface = {
          repository: dataArray[0],
          tag: dataArray[1],
          id: dataArray[2],
          createdDate: dataArray[3],
          size: dataArray[4],
        };
        tempArray.push(tempImageObject);
      });

      imageFetchCommand.on("close", () => {
        setImageArr(tempArray);
        setIsLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (imageArr.length == 0) {
      loadImages();
    } else {
      setIsLoading(false);
    }
  });
  return (
    <div>
      <h1 onClick={loadImages}>{isLoading && <Loader2 />}</h1>
      <div className="cursor-pointer p-10 text-blue-500 grid gap-5">
        {imageArr.length > 0 && (
          <div className="grid grid-cols-5">
            <div className="font-bold truncate max-w-xs ">Image ID</div>
            <div className="font-bold truncate max-w-xs ">Repository</div>
            <div className="font-bold truncate max-w-xs ">Tag</div>
            <div className="font-bold truncate max-w-xs ">Date</div>
            <div className="font-bold truncate max-w-xs ">Size</div>
          </div>
        )}
        {imageArr.length > 0 &&
          imageArr.map((image, index) => (
            <div className="grid grid-cols-5 gap-10" key={index}>
             <Link href={`/details?id=${image.id}&type=image`}>
                <Button className="truncate max-w-xs">Details</Button>
              </Link>

              <div className="truncate max-w-xs"> {image.repository}</div>
              <div className="truncate max-w-xs">{image.tag}</div>
              <div className="truncate max-w-xs">{image.createdDate}</div>
              <div className="truncate max-w-xs">{image.size}</div>
            </div>
          ))}
        {imageArr.length <= 0 && !isLoading && <h1>No images found</h1>}
      </div>
    </div>
  );
}

export default React.memo(ImageList);
