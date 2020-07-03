/* eslint-disable keyword-spacing */
/* eslint-disable no-new-wrappers */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-indent-props */
import {Component} from 'preact';
import {route} from 'preact-router';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

import style from './style';

export default class CustomDialog extends Component {
    state = {
        data: {
            tags: []
        },
        supportShare: false,
        star: false,
        showSpeaker: false,
        speakerId: 0
    };

    showSpeaker = item => e => {
        if (this.props.speakers[item]) {
            this.setState({showSpeaker: true, speakerId: item});
            this.dialogContainer.scrollTop = 0;
            this.dialogBody.scrollTop = 0;
        }
    };

    hideSpeaker = () => {
        this.setState({showSpeaker: false});
        this.dialogContainer.scrollTop = 0;
        this.dialogBody.scrollTop = 0;
    };

    star = id => e => {
        let star = this.props.star ? !this.props.star[id] : true;
        const ref = this.props.db.ref(
            'users/' + this.props.user.uid + '/schedule/' + id
        );
        ref.set(star ? true : null);
    };

    share = (dataId, data) => e => {
        if (navigator.share) {
            navigator.share({
                title: 'Developer Student Clubs OMG 2020',
                text: `Check out '${data.title}' at #dscomg`,
                url: `https://dscomg.com/schedule/${dataId}`
            });
        }
    };

    onClose = type => e => {
        route(this.props.rootPath + this.state.type);
    };

    toggle(dataId, dataItem, dataType) {
        this.dialogContainer.scrollTop = 0;
        this.setState({
            data: dataItem,
            id: dataId,
            type: dataType,
            showSpeaker: false
        });
        if (this.scrollingDlg) {
            this.scrollingDlg.MDComponent.show();
        }
        if (dataType === 'speakers') {
            this.setState({showSpeaker: true, speakerId: dataId});
        }
    }

    close() {
        this.scrollingDlg.MDComponent.close();
    }

    parseTopic(topic) {
        topic = topic.replace('_', ' ');
        return topic.charAt(0).toUpperCase() + topic.slice(1);
    }

    profilePicFallback = () => event => {
        event.target.src = this.props.rootPath + 'assets/person.svg';
    };

    constructor(props) {
        super();
        if (typeof window !== 'undefined') {
            if (navigator.share) {
                this.setState({supportShare: true});
            }
        }
    }

    render(
        {rootPath, user, star, speakers},
        {id, data, type, supportShare, showSpeaker, speakerId}
    ) {
        return (
            <Dialog
                onCancel={this.onClose(type)}
                onAccept={this.onClose(type)}
                class={style.dialog}
                ref={scrollingDlg => {
                    this.scrollingDlg = scrollingDlg;
                }}
            >
                <div
                    class={style.dialog_container}
                    ref={dialogContainer => {
                        this.dialogContainer = dialogContainer;
                    }}
                >
                    <div class={style.dialog_header}>
                        {showSpeaker ? (
                            type === 'speakers' ? (
                                <Dialog.FooterButton ripple={false} class={style.back} accept>
                                    <svg>
                                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                                    </svg>
                                </Dialog.FooterButton>
                            ) : (
                                <div class={style.back} ripple={false} onClick={this.hideSpeaker}>
                                    <svg>
                                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                                    </svg>
                                </div>
                            )
                        ) : (
                            <Dialog.FooterButton ripple={false} class={style.back} accept>
                                <svg>
                                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                                </svg>
                            </Dialog.FooterButton>
                        )}
                        {showSpeaker ? (
                            <div class={style.header_text}>
                                <div>{speakers[speakerId].name}</div>
                                <div class={style.header_subtext}>
                                    {speakers[speakerId].title}
                                </div>
                            </div>
                        ) : (
                            data && (
                                <div class={style.header_text}>
                                    {data.title}
                                    {data.slido && (
                                        <div>
                                            <Button
                                                disabled={this.isFutureOrPassed(data)}
                                                raised
                                                className={`mdc-theme--secondary-bg ${
                                                    style.askQuestionBtn
                                                } `}
                                                onClick={() => {
                                                    document.location.href = data.slido;
                                                }}
                                            >
                                                Ask Questions
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                        {showSpeaker &&
                        (speakers[speakerId].profile_pic ? (
                            <img
                                crossorigin="anonymous"
                                class={style.header_speaker_profile}
                                src={speakers[speakerId].profile_pic}
                                onError={this.profilePicFallback()}
                            />
                        ) : (
                            <img
                                crossorigin="anonymous"
                                class={style.header_speaker_profile}
                                src={rootPath + 'assets/person.svg'}
                            />
                        ))}
                        {user && (
                            <div class={style.fab} onClick={this.star(id)}>
                                <svg>
                                    {star ? (
                                        star[id] ? (
                                            <path
                                                fill="#4768FD"
                                                d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"
                                            />
                                        ) : (
                                            <path
                                                d="M19.65,9.04l-4.84-0.42l-1.89-4.45c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75 l3.67,3.18l-1.1,4.72c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.73l3.67-3.18 C20.88,10.21,20.53,9.11,19.65,9.04z M12,15.4l-3.76,2.27l1-4.28l-3.32-2.88l4.38-0.38L12,6.1l1.71,4.04l4.38,0.38l-3.32,2.88 l1,4.28L12,15.4z"/>
                                        )
                                    ) : (
                                        <path
                                            d="M19.65,9.04l-4.84-0.42l-1.89-4.45c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75 l3.67,3.18l-1.1,4.72c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.73l3.67-3.18 C20.88,10.21,20.53,9.11,19.65,9.04z M12,15.4l-3.76,2.27l1-4.28l-3.32-2.88l4.38-0.38L12,6.1l1.71,4.04l4.38,0.38l-3.32,2.88 l1,4.28L12,15.4z"/>
                                    )}
                                </svg>
                            </div>
                        )}
                    </div>
                    <div
                        class={style.dialog_body}
                        ref={dialogBody => {
                            this.dialogBody = dialogBody;
                        }}
                        scrollable
                    >
                        {showSpeaker ? (
                            <div class={style.speaker_bio}>{speakers[speakerId].description}</div>
                        ) : (
                            <div>
                                <div class={style.subtitle}>
                                    {data.startTime} - {data.endTime} PM | {data.duration}
                                </div>
                                <p class={style.dialog_body_description}>{data.description}</p>
                                <div class={style.schedule_event_topics}>
                                    {data.topics &&
                                    data.topics.map(item => (
                                        <div id={item} class="session_topic">
                                            <span class="session_topic_dot"/>
                                            <span>{this.parseTopic(item)}</span>
                                        </div>
                                    ))}
                                </div>
                                {data.speakers && (
                                    <div class={style.speaker}>
                                        <h3>Speakers </h3>
                                        {data.speakers &&
                                        speakers &&
                                        data.speakers.map(
                                            item =>
                                                speakers[item] && (
                                                    <div
                                                        class={style.speaker_item}
                                                        onClick={this.showSpeaker(item)}
                                                    >
                                                        {speakers[item].profile_pic ? (
                                                            <img
                                                                crossorigin="anonymous"
                                                                class={style.speaker_thumbnail}
                                                                src={speakers[item].profile_pic}
                                                                onError={this.profilePicFallback()}
                                                            />
                                                        ) : (
                                                            <img
                                                                crossorigin="anonymous"
                                                                class={style.speaker_thumbnail}
                                                                src={rootPath + 'assets/person.svg'}
                                                            />
                                                        )}
                                                        <div class={style.speaker_details}>
                                                            <div class={style.speaker_name}>
                                                                {speakers[item].name}
                                                            </div>
                                                            <div class={style.speaker_title}>
                                                                {speakers[item].title}
                                                            </div>
                                                        </div>
                                                        <div class={style.speaker_arrow}>
                                                            <svg>
                                                                <g>
                                                                    <path
                                                                        d="M5,13h11.17l-4.88,4.88c-0.39,0.39-0.39,1.03,0,1.42l0,0c0.39,0.39,1.02,0.39,1.41,0l6.59-6.59c0.39-0.39,0.39-1.02,0-1.41 L12.71,4.7c-0.39-0.39-1.02-0.39-1.41,0l0,0c-0.39,0.39-0.39,1.02,0,1.41L16.17,11H5c-0.55,0-1,0.45-1,1v0C4,12.55,4.45,13,5,13z"/>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {(supportShare || user) && (
                        <Dialog.Footer class={style.dialog_footer}>
                            {user && (
                                <div class={style.fab} onClick={this.star(id)}>
                                    <svg>
                                        {star ? (
                                            star[id] ? (
                                                <path
                                                    fill="#4768FD"
                                                    d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"
                                                />
                                            ) : (
                                                <path
                                                    d="M19.65,9.04l-4.84-0.42l-1.89-4.45c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75 l3.67,3.18l-1.1,4.72c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.73l3.67-3.18 C20.88,10.21,20.53,9.11,19.65,9.04z M12,15.4l-3.76,2.27l1-4.28l-3.32-2.88l4.38-0.38L12,6.1l1.71,4.04l4.38,0.38l-3.32,2.88 l1,4.28L12,15.4z"/>
                                            )
                                        ) : (
                                            <path
                                                d="M19.65,9.04l-4.84-0.42l-1.89-4.45c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75 l3.67,3.18l-1.1,4.72c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.73l3.67-3.18 C20.88,10.21,20.53,9.11,19.65,9.04z M12,15.4l-3.76,2.27l1-4.28l-3.32-2.88l4.38-0.38L12,6.1l1.71,4.04l4.38,0.38l-3.32,2.88 l1,4.28L12,15.4z"/>
                                        )}
                                    </svg>
                                </div>
                            )}
                            {supportShare && (
                                <div class={style.share} onClick={this.share(id, data)}>
                                    <svg>
                                        <path
                                            d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                                    </svg>
                                </div>
                            )}
                        </Dialog.Footer>
                    )}
                </div>
            </Dialog>
        );
    }

    isFutureOrPassed(data) {

        const today = new Date();
        if (!data.startTime) return;

        const [startHour, startMinute] = data.startTime.split(/:|AM|PM/);
        const [endHour, endMinute] = data.endTime.split(/:|AM|PM/);

        const fullStartHour = data.startTime.includes('PM') ? new Number(startHour) + 12 : new Number(startHour);
        const fullEndHour = data.endTime.includes('PM') ? new Number(endHour) + 12 : new Number(endHour);
        const hasStarted = today >= new Date(today.getFullYear(), today.getMonth(), today.getDate(), fullStartHour, startMinute);

        const isOver = today > new Date(today.getFullYear(), today.getMonth(), today.getDate(), fullEndHour, endMinute);

        return !hasStarted || isOver;
    }

}
