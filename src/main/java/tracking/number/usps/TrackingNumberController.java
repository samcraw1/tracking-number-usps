package tracking.number.usps;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/tracking")
@CrossOrigin(origins = "http://localhost:3000")// or whatever the frontend URL is
public class TrackingNumberController {

    private final TrackingNumberService trackingNumberService;

    public TrackingNumberController(TrackingNumberService trackingNumberService){
        this.trackingNumberService = trackingNumberService;
    }

    @GetMapping("/")
    public List<TrackingNumber> getAllTrackingNumbers(){
        return trackingNumberService.getAllTrackingNumbers();
    }

    @GetMapping("/{trackingNumber}")
    public TrackingNumber getTrackingNumber(@PathVariable("trackingNumber") String trackingNumber){
        return trackingNumberService.getTrackingNumberService(trackingNumber);
    }

    @PutMapping("/{trackingNumber}")
    public TrackingNumber updateTrackingNumber(@PathVariable("trackingNumber") String trackingNumber, @RequestBody TrackingNumber trackingNumberDetails){
        return trackingNumberService.updateTrackingNumberService(trackingNumber, trackingNumberDetails.getCurrentLocation(), trackingNumberDetails.getCurrentStatus());
    }

    @DeleteMapping("/{trackingNumber}")
    public void deleteTrackingNumber(@PathVariable("trackingNumber") String trackingNumber){
        trackingNumberService.deleteTrackingNumberService(trackingNumber);
    }

    @PostMapping("/")
    public TrackingNumber createTrackingNumber(@RequestBody TrackingNumber trackingNumber){
        return trackingNumberService.createTrackingNumberService(trackingNumber);
    }
}
