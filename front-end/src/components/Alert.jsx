import Alert from 'react-bootstrap/Alert';

function Alerts() {
  return (
    <>
      {[
        'dark',
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
         ADDED TO Wishlist
        </Alert>
      ))}
    </>
  );
}

export default Alerts;