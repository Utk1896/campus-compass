const LocationDetails = ({ location }: { location: any }) => {
    return (
      <div>
        <h3>{location.name}</h3>
        <p>{location.description}</p>
        <div>
          <h4>Images:</h4>
          {location.images?.map((url: string, index: number) => (
            <img key={index} src={url} alt="location" style={{ maxWidth: 200 }} />
          ))}
        </div>
      </div>
    );
  };
  
  export default LocationDetails;
  