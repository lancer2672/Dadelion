export const isUrlExpired = ({ url }) => {
  if (!url) {
    return null;
  }
  const urlParams = new URLSearchParams(new URL(url).search);

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
  return expiryDate.getTime() < Date.now();
};
// Example usage
const signedUrl =
  "https://dandelionbucket.s3.ap-southeast-1.amazonaws.com/7633b085ac4220ad104c66248fb2e5d9db75cf8b13aab009134c356393c1a652?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQD2S5ARFGOZIBWU5%2F20231211%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231211T184638Z&X-Amz-Expires=3600&X-Amz-Signature=a65e6215d063a4ff40bff6e1e61b9a603e69656ba22de96bcc2ee85b840ce9cf&X-Amz-SignedHeaders=host&x-id=GetObject";

const expirationTimestamp = isUrlExpired({ url: signedUrl });
console.log("Expiration Timestamp:", expirationTimestamp);
