import { RawDraftContentState } from "draft-js"
import { User } from "../../interface/user.interface"

export interface ContactMsgDto {
    sender: Partial<User>
    msg: RawDraftContentState
    topic: string
}