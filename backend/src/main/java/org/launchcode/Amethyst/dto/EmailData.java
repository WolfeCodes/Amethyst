package org.launchcode.Amethyst.dto;

public class EmailData {
    private String email_address;
    private String domain;
    private boolean valid_syntax;
    private boolean disposable;
    private boolean webmail;
    private boolean deliverable;
    private boolean catch_all;
    private boolean gibberish;
    private boolean spam;

    public EmailData(String email_address, String domain, boolean valid_syntax, boolean disposable, boolean webmail, boolean deliverable, boolean catch_all, boolean gibberish, boolean spam) {
        this.email_address = email_address;
        this.domain = domain;
        this.valid_syntax = valid_syntax;
        this.disposable = disposable;
        this.webmail = webmail;
        this.deliverable = deliverable;
        this.catch_all = catch_all;
        this.gibberish = gibberish;
        this.spam = spam;
    }

    public String getEmail_address() {
        return email_address;
    }

    public void setEmail_address(String email_address) {
        this.email_address = email_address;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public boolean isValid_syntax() {
        return valid_syntax;
    }

    public void setValid_syntax(boolean valid_syntax) {
        this.valid_syntax = valid_syntax;
    }

    public boolean isDisposable() {
        return disposable;
    }

    public void setDisposable(boolean disposable) {
        this.disposable = disposable;
    }

    public boolean isWebmail() {
        return webmail;
    }

    public void setWebmail(boolean webmail) {
        this.webmail = webmail;
    }

    public boolean isDeliverable() {
        return deliverable;
    }

    public void setDeliverable(boolean deliverable) {
        this.deliverable = deliverable;
    }

    public boolean isCatch_all() {
        return catch_all;
    }

    public void setCatch_all(boolean catch_all) {
        this.catch_all = catch_all;
    }

    public boolean isGibberish() {
        return gibberish;
    }

    public void setGibberish(boolean gibberish) {
        this.gibberish = gibberish;
    }

    public boolean isSpam() {
        return spam;
    }

    public void setSpam(boolean spam) {
        this.spam = spam;
    }
}
