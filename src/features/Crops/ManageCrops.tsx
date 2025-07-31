"use client"

import { useAuthUsers } from "../Authentication/useAuthUsers"
import useUser from "../Authentication/useUser"
import CropsActions from "./CropsActions"
import CropsShow from "./CropsShow"
import { CreateCrop } from "./CreateCrop"
import { useCrops } from "./useCrops"
import { useTranslation } from "react-i18next"

export default function ManageCrops() {
  const { user } = useUser()
  const userId = user?.id
  const { crops } = useCrops()
  const { authUsers, isLoading: isAuthUsersLoading } = useAuthUsers()

  const authUser = authUsers?.find((user) => user.authUserId === userId)
  const id = authUser?.id
  const cropsShow = crops?.filter((crop) => crop.userId === id)
  const { t } = useTranslation()

  return (
    <div className="mb-[100px] mt-[80px] space-y-9 bg-background">
      <div className="space-y-3">
        <h2 className="font-playfair text-4xl font-extrabold text-foreground">{t("cropManager")}</h2>
        <p className="font-lg space-x-1 font-light text-muted-foreground">
          {t("shortDescriptionManager1")}{" "}
          <span className="font-bold text-green-500">{t("shortDescriptionManager2")}</span>
        </p>
      </div>
      {isAuthUsersLoading ? (
        <div className="flex h-screen items-center justify-center bg-background">
          <div className="loader"></div>
        </div>
      ) : cropsShow?.length === 0 ? (
        <div className="flex h-[30vh] flex-col items-center justify-center gap-4">
          <p className="text-lg text-muted-foreground">{t("noPersonalCrops")}</p>
          <CreateCrop id={id} />
        </div>
      ) : (
        <>
          <CropsActions id={id} />
          <CropsShow crops={cropsShow} />
        </>
      )}
    </div>
  )
}
