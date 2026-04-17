from sqlalchemy.ext.asyncio import AsyncSession

from app.models.booking import RoomBooking
from app.models.enums import ApprovalAction, BookingStatus, NotificationType
from app.models.notification import Notification


class NotificationService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def _push(
        self,
        user_id: str,
        type: NotificationType,
        title: str,
        message: str,
        booking_id: str | None = None,
    ) -> None:
        self.db.add(
            Notification(
                user_id=user_id,
                booking_id=booking_id,
                type=type,
                title=title,
                message=message,
            )
        )

    async def on_booking_submitted(self, booking: RoomBooking) -> None:
        ref = booking.booking_reference
        await self._push(
            booking.requester_id,
            NotificationType.booking_submitted,
            "Booking Submitted",
            f"Your booking {ref} has been submitted and is awaiting HOD approval.",
            booking.id,
        )

    async def on_approval_action(
        self, booking: RoomBooking, action: ApprovalAction, approver_name: str
    ) -> None:
        ref = booking.booking_reference

        if action == ApprovalAction.approved:
            # Notify requester of intermediate approvals
            if booking.status == BookingStatus.dean_approved:
                title = "Booking Fully Approved"
                msg = f"Your booking {ref} has been fully approved by the Dean/Registrar."
            else:
                title = "Booking Approved — Next Stage"
                msg = f"Your booking {ref} was approved by {approver_name} and moved to the next approval stage."

            await self._push(
                booking.requester_id,
                NotificationType.approved,
                title,
                msg,
                booking.id,
            )
        else:
            await self._push(
                booking.requester_id,
                NotificationType.rejected,
                "Booking Rejected",
                f"Your booking {ref} was rejected by {approver_name}. Check the approval history for comments.",
                booking.id,
            )

    async def on_booking_cancelled(self, booking: RoomBooking) -> None:
        await self._push(
            booking.requester_id,
            NotificationType.cancelled,
            "Booking Cancelled",
            f"Your booking {booking.booking_reference} has been cancelled.",
            booking.id,
        )