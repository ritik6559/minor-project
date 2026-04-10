import uuid
from sqlalchemy import String, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base
from backend.src.app.models.booking import RoomBooking
from backend.src.app.models.user import User

class Department(Base):
    __tablename__ = "departments"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    code: Mapped[str] = mapped_column(String(10), unique=True, nullable=False, index=True)
    hod_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("users.id", ondelete="SET NULL"))
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    hod: Mapped["User"] = relationship("User", foreign_keys=[hod_id], back_populates="departments_as_hod")
    members: Mapped[list["User"]] = relationship("User", foreign_keys="User.department_id", back_populates="department")
    bookings: Mapped[list["RoomBooking"]] = relationship("RoomBooking", back_populates="requester_department")