interface ErrorBannerProps {
  message: string;
}

const ErrorBanner = ({ message }: ErrorBannerProps) => (
  <div
    style={{
      background: "#fee",
      color: "#c00",
      padding: 8,
      borderRadius: 4,
      marginBottom: 8,
      fontSize: 13,
    }}
  >
    {message}
  </div>
);

export default ErrorBanner;
