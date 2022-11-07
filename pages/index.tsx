import axios from "axios";
import { useCallback, useEffect, useRef } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        const { data } = await axios.post("/api/data", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <input type="file" ref={inputRef} onChange={onUploadImage} />
      <button onClick={onUploadImageButtonClick} />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}
