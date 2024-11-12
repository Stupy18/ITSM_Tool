package ubb.project.ubb.data;

public enum UserRole {
    ADMIN(1),
    DEVELOPER(2),
    GUEST(3);

    private final int roleId;

    UserRole(int roleId) {
        this.roleId = roleId;
    }

    public int getRoleId() {
        return roleId;
    }
}
