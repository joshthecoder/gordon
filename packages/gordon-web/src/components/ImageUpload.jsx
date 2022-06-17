import { useMemo } from "react";
import { uploadFile } from "@/api";

export default function ImageUpload({
  field: { name, value },
  form: { setFieldValue },
}) {
  const previewImg = useMemo(
    () => (value ? `${value.url}/${value.key}` : ""),
    [value]
  );

  const handleChange = async (e) => {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;

    const file = files[0];

    const upload = await uploadFile(file);
    setFieldValue(name, upload);
  };

  return (
    <>
      {previewImg && <img className="mb-4 w-96" src={previewImg} />}
      <input
        type="file"
        accept=".jpg,.gif,.png"
        className="mb-5 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
        onChange={handleChange}
      />
    </>
  );
}
