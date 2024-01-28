import { Avatar } from '@mui/material'

const UserCard = () => {
    return (
        <div
        // style={{
        //     cursor: isEditingCardOpen ? 'unset' : 'pointer',
        //     paddingInlineEnd: '5%',
        // }}
        // className={classes.userInformation}
        // onClick={handleMenuToggle}
        >
            <Avatar src={''} />

            <div style={{ position: 'relative' }}>

                <div>
                    <div ></div>
                    {/* <ClickAwayListener
                            disableReactTree
                            onClickAway={isEditingCardOpen && !isMobile ? handleCloseMenu : () => { }}
                        >
                            <div
                                className={classes.cardsDropdownContainer}
                                ref={cardsDropdownContainerRef}
                                onClick={(e: any) => {
                                    e.stopPropagation()
                                }}
                            >
                                <UserPersonalMenu setIsEditingCardOpen={setIsEditingCardOpen} />
                            </div>
                        </ClickAwayListener> */}
                </div>
            </div>
        </div>
    )
}

export default UserCard