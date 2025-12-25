'use client'

import { useCallback, useEffect, useState } from 'react'
import { useClient } from 'sanity'
import {
  Stack,
  Card,
  Checkbox,
  Text,
  Flex,
  Box,
  Spinner,
  Badge,
} from '@sanity/ui'
import { set, unset, ObjectInputProps } from 'sanity'

interface Subsection {
  name: string
  icon?: string
  order: number
}

interface Collection {
  _id: string
  name: string
  icon?: string
  subsections?: Subsection[]
}

interface CollectionAssignmentValue {
  _key?: string
  _type?: string
  collection?: {
    _type: 'reference'
    _ref: string
  }
  subsections?: string[]
}

/**
 * Custom Sanity input component for Content Hub collection + subsection assignment.
 *
 * Features:
 * - Shows collection reference selector (uses default Sanity reference input)
 * - Dynamically fetches and displays subsections when collection is selected
 * - Allows multi-select of subsections via checkboxes
 * - Empty subsection selection = entry appears in ALL subsections
 */
export function CollectionSubsectionInput(props: ObjectInputProps<CollectionAssignmentValue>) {
  const { value, onChange, renderDefault } = props
  const client = useClient({ apiVersion: '2024-01-01' })

  const [collection, setCollection] = useState<Collection | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch collection data when collection reference changes
  useEffect(() => {
    const collectionRef = value?.collection?._ref

    if (!collectionRef) {
      setCollection(null)
      return
    }

    setLoading(true)
    setError(null)

    client
      .fetch<Collection>(
        `*[_type == "collection" && _id == $id][0]{
          _id,
          name,
          icon,
          subsections[]{
            name,
            icon,
            order
          }
        }`,
        { id: collectionRef }
      )
      .then((result) => {
        setCollection(result)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching collection:', err)
        setError('Failed to load collection data')
        setLoading(false)
      })
  }, [client, value?.collection?._ref])

  // Handle subsection checkbox toggle
  const handleSubsectionToggle = useCallback(
    (subsectionName: string, checked: boolean) => {
      const currentSubsections = value?.subsections || []

      let newSubsections: string[]
      if (checked) {
        // Add subsection
        newSubsections = [...currentSubsections, subsectionName]
      } else {
        // Remove subsection
        newSubsections = currentSubsections.filter((s) => s !== subsectionName)
      }

      // Update the value
      if (newSubsections.length === 0) {
        onChange(unset(['subsections']))
      } else {
        onChange(set(newSubsections, ['subsections']))
      }
    },
    [onChange, value?.subsections]
  )

  // Check if a subsection is selected
  const isSubsectionSelected = useCallback(
    (subsectionName: string) => {
      return value?.subsections?.includes(subsectionName) || false
    },
    [value?.subsections]
  )

  // Sort subsections by order
  const sortedSubsections = collection?.subsections
    ?.slice()
    .sort((a, b) => (a.order || 0) - (b.order || 0)) || []

  return (
    <Stack space={4}>
      {/* Render the default Sanity input for the object fields (collection reference) */}
      {renderDefault(props)}

      {/* Subsection Selection UI */}
      {value?.collection?._ref && (
        <Card padding={3} radius={2} tone="transparent" border>
          <Stack space={3}>
            <Flex align="center" gap={2}>
              <Text size={1} weight="semibold">
                Subsections
              </Text>
              {loading && <Spinner />}
            </Flex>

            {error && (
              <Card padding={2} radius={2} tone="critical">
                <Text size={1}>{error}</Text>
              </Card>
            )}

            {!loading && collection && sortedSubsections.length === 0 && (
              <Text size={1} muted>
                This collection has no subsections defined.
              </Text>
            )}

            {!loading && collection && sortedSubsections.length > 0 && (
              <>
                <Text size={1} muted>
                  Select which subsections this entry should appear in.
                  Leave all unchecked to show in ALL subsections.
                </Text>

                <Stack space={2}>
                  {sortedSubsections.map((subsection) => (
                    <Card
                      key={subsection.name}
                      padding={2}
                      radius={2}
                      tone={isSubsectionSelected(subsection.name) ? 'primary' : 'default'}
                    >
                      <Flex align="center" gap={2}>
                        <Checkbox
                          checked={isSubsectionSelected(subsection.name)}
                          onChange={(e) =>
                            handleSubsectionToggle(
                              subsection.name,
                              e.currentTarget.checked
                            )
                          }
                        />
                        <Box flex={1}>
                          <Flex align="center" gap={2}>
                            {subsection.icon && (
                              <Text size={1}>{subsection.icon}</Text>
                            )}
                            <Text size={1} weight="medium">
                              {subsection.name}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Card>
                  ))}
                </Stack>

                {/* Show current selection status */}
                <Flex align="center" gap={2} paddingTop={2}>
                  {value?.subsections && value.subsections.length > 0 ? (
                    <>
                      <Badge tone="primary" fontSize={0}>
                        {value.subsections.length} selected
                      </Badge>
                      <Text size={0} muted>
                        Entry will appear only in selected subsections
                      </Text>
                    </>
                  ) : (
                    <>
                      <Badge tone="positive" fontSize={0}>
                        All
                      </Badge>
                      <Text size={0} muted>
                        Entry will appear in all subsections
                      </Text>
                    </>
                  )}
                </Flex>
              </>
            )}
          </Stack>
        </Card>
      )}
    </Stack>
  )
}

export default CollectionSubsectionInput
