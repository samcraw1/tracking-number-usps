package tracking.number.usps;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TrackingNumberService {

    private final TrackingNumberRepository trackingNumberRepository;

    public TrackingNumberService(TrackingNumberRepository trackingNumberRepository){
        this.trackingNumberRepository = trackingNumberRepository;
    }

    public List<TrackingNumber> getAllTrackingNumbers(){
        return trackingNumberRepository.findAll();
    }

    public TrackingNumber getTrackingNumberService(String trackingNumber){
        return trackingNumberRepository.findById(trackingNumber)
                .orElseThrow(() -> new NoSuchElementException("No tracking number found: " + trackingNumber));
    }

    public TrackingNumber updateTrackingNumberService(String trackingNumber, String currentLocation, String currentStatus){
        TrackingNumber existing = getTrackingNumberService(trackingNumber);
        existing.setCurrentLocation(currentLocation);
        existing.setCurrentStatus(currentStatus);
        return trackingNumberRepository.save(existing);
    }

    public void deleteTrackingNumberService(String trackingNumber){
        trackingNumberRepository.deleteById(trackingNumber);
    }

    public TrackingNumber createTrackingNumberService(TrackingNumber trackingNumber){
        return trackingNumberRepository.save(trackingNumber);
    }
}
