package org.launchcode.Amethyst.dto;

public class IsTempMailResponse {

    private String name;
    private boolean blocked;
    private boolean unresolvable; // New field for unresolvable domain

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }

    public boolean isUnresolvable() { // Getter for unresolvable field
        return unresolvable;
    }

    public void setUnresolvable(boolean unresolvable) { // Setter for unresolvable field (optional)
        this.unresolvable = unresolvable;
    }
}
