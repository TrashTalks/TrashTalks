import React from 'react'
import "./PersonCard.css"
import {Image, Icon, Card} from 'semantic-ui-react'


var PersonCard = props => 

  <Card centered className="personCard" onClick={props.showModalBio}>
    <Image src={props.imageLink} />

    <Card.Content>
      <Card.Header>{props.personName}</Card.Header>
      <Card.Meta>{props.personTitle}</Card.Meta>
      <Card.Description>{props.personDescription}</Card.Description>
    </Card.Content>

    <Card.Content extra>
        <Icon name={props.iconTypeName} />
        {props.funFact}
    </Card.Content>

  </Card>
export default PersonCard;