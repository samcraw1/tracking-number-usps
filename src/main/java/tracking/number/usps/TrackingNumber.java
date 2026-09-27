package tracking.number.usps;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class TrackingNumber{
    @Id
    private String trackingNumber;
    private String sentFrom;
    private String sentTo;
    private String currentLocation;
    private String currentStatus;

    public TrackingNumber(){
    }

    public TrackingNumber(String trackingNumber, String sentFrom, String sentTo, String currentLocation, String currentStatus){
        this.trackingNumber = trackingNumber;
        this.sentFrom = sentFrom;
        this.sentTo = sentTo;
        this.currentLocation = currentLocation;
        this.currentStatus = currentStatus;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public String getSentFrom() {
        return sentFrom;
    }

    public String getSentTo() {
        return sentTo;
    }

    public String getCurrentLocation() {
        return currentLocation;
    }

    public String getCurrentStatus() {
        return currentStatus;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public void setSentFrom(String sentFrom) {
        this.sentFrom = sentFrom;
    }

    public void setSentTo(String sentTo) {
        this.sentTo = sentTo;
    }

    public void setCurrentLocation(String currentLocation) {
        this.currentLocation = currentLocation;
    }

    public void setCurrentStatus(String currentStatus) {
        this.currentStatus = currentStatus;
    }

    
}