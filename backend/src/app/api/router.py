from fastapi import APIRouter

from app.api import approvals, auth, bookings, notifications, rooms, users

router = APIRouter()
router.include_router(auth.router)
router.include_router(users.router)
router.include_router(rooms.router)
router.include_router(bookings.router)
router.include_router(approvals.router)
router.include_router(notifications.router)