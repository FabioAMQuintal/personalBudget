openapi: 3.0.1
info:
  title: Personal Budget App
  version: 1.0.0
  description: >-
    This is a personal budget application made for you to keep track of your own
    money
paths:
  /:
    summary: get - Return all envelopes
    get:
      summary: Retrieve all envelopes
      description: ''
      operationId: getAll_envelope
      responses:
        default:
          description: Default error sample response
      tags:
        - Envelopes
  /envelope/{id}:
    summary: get a single envelope
    description: Return an envelope based on its ID.
    get:
      summary: Retrive an envelope based on its ID
      description: ''
      operationId: getOne_envelope
      parameters:
        - name: id
          in: path
          description: 'The id of the order.'
          required: true
          schema:
            type: string
      responses:
        default:
          description: Default error sample response
      tags:
        - Envelopes
  /newEnvelope:
    summary: post a new envelope
    description: Create and persist a new envelope.
    post:
      summary: Create a new envelope
      description: ''
      operationId: postNew_envelope
      requestBody:
        description: A new envelope object
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Envelope'
      responses:
        default:
          description: Default error sample response
      tags:
        - Envelopes
  /deleteEnvelope/{id}:
    summary: delete a single envelope
    description: Delete an envelope based on its ID.
    delete:
      summary: Delete an envelope based on its id
      description: ''
      operationId: deleteSingle_envelope
      parameters:
        - name: id
          in: path
          description: 'The id of the order.'
          required: true
          schema:
            type: string
      responses:
        default:
          description: Default error sample response
      tags:
        - Envelopes
  /transfer/{fromID}/to/{id}:
    summary: Transfer amount between two distinct envelope
    description: Transfer amount from one envolpe to another, if possible.
    patch:
      summary: Transfer value between two envelopes if possible
      description: ''
      operationId: transfer_envelope
      parameters:
        - name: id
          in: path
          description: 'The id of the order.'
          required: true
          schema:
            type: string
        - name: fromID
          in: path
          description: 'The id of the order.'
          required: true
          schema:
            type: string
      requestBody:
        description: A new envelope object
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Envelope'
      responses:
        default:
          description: Default error sample response
      tags:
        - Envelopes
  /increaseEnvelope/{id}:
    summary: Update an envelope
    description: increase an envelope's balance from your own balance.
    patch:
      summary: Increase the envelope's balance
      description: ''
      operationId: increase_envelope
      parameters:
        - name: id
          in: path
          description: 'The id of the order.'
          required: true
          schema:
            type: string
      requestBody:
        description: A new envelope object
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Envelope'
      responses:
        default:
          description: Default error sample response
      tags:
        - Envelopes
  /insertBalance/:
    summary: Insert money to your balance
    description: >-
      add value to your personal balance. To insert value into a specific
      envelope, use /increaseEnvelope.
    put:
      summary: Insert new resources to your own balance
      description: ''
      operationId: increaseBalance_envelope
      responses:
        default:
          description: Default error sample response
      tags:
        - Envelopes
  /decreaseEnvelope/{id}:
    summary: Extract amount from an envelope to your own balance
    description: Extract amount from an envelope to your own balance, if possible.
    patch:
      summary: Decrease the envelope's balance
      description: ''
      operationId: decrease_envelope
      parameters:
        - name: id
          in: path
          description: 'The id of the order.'
          required: true
          schema:
            type: string
      responses:
        default:
          description: Default error sample response
      tags:
        - Envelopes
        
components:
  schemas:
    Envelope:
      type: object
      properties:
        name:
          type: string
        id:
          type: string
        fromID: 
          type: string
      xml:
        name: Envelope
