export default function Notification({ source }) {
  const hasNotification = true;

  return (
    <div className="position-relative d-inline-block">

      {/* Button */}
      <button className="btn p-0 bg-transparent border-0 shadow-none position-relative">

        <img
          src={source}
          alt="notifications"
          width={24}
          height={24}
        />

        {/*  Dot */}
        {hasNotification && (
          <span
            className="position-absolute top-0 align-item-center justify-content-center start-100 translate-middle bg-danger rounded-circle border border-light"
            style={{ width: 15, height: 15 }}
          />
        )}

      </button>
    </div>
  );
}