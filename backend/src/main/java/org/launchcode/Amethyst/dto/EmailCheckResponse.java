package org.launchcode.Amethyst.dto;

public class EmailCheckResponse {

    private String status;
    private EmailData data;

    public EmailCheckResponse(String status, EmailData data) {
        this.status = status;
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public EmailData getData() {
        return data;
    }

    public void setData(EmailData data) {
        this.data = data;
    }
}
