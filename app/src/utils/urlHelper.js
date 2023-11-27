const getExpirationTimestamp = (signedUrl) => {
  const urlParams = new URLSearchParams(new URL(signedUrl).search);

  const generatedTime = urlParams.get("X-Amz-Date");
  const expiresIn = urlParams.get("X-Amz-Expires");
  console.log("expiresIn", expiresIn);
  const generatedDate = new Date(
    Date.UTC(
      parseInt(generatedTime.slice(0, 4)),
      parseInt(generatedTime.slice(4, 6)) - 1,
      parseInt(generatedTime.slice(6, 8)),
      parseInt(generatedTime.slice(9, 11)),
      parseInt(generatedTime.slice(11, 13)),
      parseInt(generatedTime.slice(13, 15))
    )
  );

  const expiryDate = new Date(generatedDate.getTime() + expiresIn * 1000);

  console.log(`URL will expire at ${expiryDate}`);
};
// Example usage
const signedUrl =
  "https://dandelionbucket.s3.ap-southeast-1.amazonaws.com/5639d0ffddcdc6f856e5e256ff52cecb017cf4d50df39b91b44421090ea6d25f?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQD2S5ARFGOZIBWU5%2F20231125%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231125T015827Z&X-Amz-Expires=3600&X-Amz-Signature=a2d95e252afc2e2b64d9f4931bf388d823f0d08c6a3ebf7f48e9c6be554c2dd8&X-Amz-SignedHeaders=host&x-id=GetObject";

const expirationTimestamp = getExpirationTimestamp(signedUrl);
console.log("Expiration Timestamp:", expirationTimestamp);
