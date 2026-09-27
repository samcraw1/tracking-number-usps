package tracking.number.usps;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackingNumberRepository extends JpaRepository<TrackingNumber, String> {


    
    
}
