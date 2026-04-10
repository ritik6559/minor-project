import uuid
from sqlalchemy import String, Boolean, Enum as SAEnum, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base
from app.models.enums import UserRole
from backend.src.app.models.approval_history import ApprovalHistory
from backend.src.app.models.booking import RoomBooking
from backend.src.app.models.department import Department
from backend.src.app.models.notification import Notification

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(15))
    role: Mapped[UserRole] = mapped_column(SAEnum(UserRole), nullable=False, index=True)
    department_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("departments.id", ondelete="SET NULL"), index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    department: Mapped["Department"] = relationship("Department", foreign_keys=[department_id], back_populates="members")
    departments_as_hod: Mapped[list["Department"]] = relationship("Department", foreign_keys="Department.hod_id", back_populates="hod")
    bookings_requested: Mapped[list["RoomBooking"]] = relationship("RoomBooking", foreign_keys="RoomBooking.requester_id", back_populates="requester")
    bookings_as_faculty_incharge: Mapped[list["RoomBooking"]] = relationship("RoomBooking", foreign_keys="RoomBooking.faculty_incharge_id", back_populates="faculty_incharge")
    approval_history: Mapped[list["ApprovalHistory"]] = relationship("ApprovalHistory", back_populates="approver")
    notifications: Mapped[list["Notification"]] = relationship("Notification", back_populates="user")